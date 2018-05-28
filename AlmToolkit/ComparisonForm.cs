using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Serialization;
using BismNormalizer;
using BismNormalizer.TabularCompare;
using BismNormalizer.TabularCompare.Core;
using BismNormalizer.TabularCompare.UI;
using CefSharp;
using CefSharp.WinForms;

namespace AlmToolkit
{
    public partial class ComparisonForm : Form
    {
        #region Private Members

        private ComparisonInfo _comparisonInfo;
        private Comparison _comparison;
        private ComparisonJSInteraction _comparisonInter; // CEFSharp Interface to connect to Angular Tree Control
        private ChromiumWebBrowser chromeBrowser;
        private const string _appCaption = "ALM Toolkit for Power BI";
        private CompareState _compareState = CompareState.NotCompared;

        #endregion

        #region Methods

        public ComparisonForm()
        {
            InitializeComponent();
            InitializeChromium();
        }

        /// <summary>
        /// Initialize the chrome browser with the html file to be opened
        /// </summary>
        private void InitializeChromium()
        {
            // Check if the page exists
            string page = string.Format(@"{0}\html-resources\dist\index.html", Application.StartupPath);
            if (!File.Exists(page))
            {
                MessageBox.Show("Error html file doesn't exist : " + page);
            }

            CefSettings settings = new CefSettings();
            // Initialize cef with the provided settings
            settings.BrowserSubprocessPath = @"x86\CefSharp.BrowserSubprocess.exe";

            Cef.Initialize(settings, performDependencyCheck: false, browserProcessHandler: null);
            // Create a browser component
            chromeBrowser = new ChromiumWebBrowser(page);
            // Add it to the form and fill it to the form window.
            this.Controls.Add(chromeBrowser);
            chromeBrowser.Dock = DockStyle.Fill;
            chromeBrowser.BringToFront();

            CefSharpSettings.LegacyJavascriptBindingEnabled = true;

            // Initialize the interaction variable
            _comparisonInter = new ComparisonJSInteraction(this);

            // Register C# objects
            chromeBrowser.RegisterAsyncJsObject("chromeDebugger", new ChromeDebugger(chromeBrowser, this));
            chromeBrowser.RegisterAsyncJsObject("comparisonJSInteraction", _comparisonInter);

        }

        private void ComparisonForm_Load(object sender, EventArgs e)
        {
            _comparisonInfo = new ComparisonInfo();
            ComparisonCtrl.ComparisonInfo = _comparisonInfo;

            GetFromAutoCompleteSource();
            GetFromAutoCompleteTarget();

            //hdpi
            Rescale();
        }

        private void ComparisonForm_Shown(object sender, EventArgs e)
        {
            this.InitializeAndCompareTabularModels();
        }

        private void SetNotComparedState()
        {
            if (_comparison != null)
            {
                _comparison.Disconnect();
            }

            btnCompareTabularModels.Enabled = true;
            ddSelectActions.Enabled = false;
            mnuHideSkipObjects.Enabled = false;
            mnuShowSkipObjects.Enabled = false;
            mnuSkipAllObjectsMissingInSource.Enabled = false;
            mnuDeleteAllObjectsMissingInSource.Enabled = false;
            mnuSkipAllObjectsMissingInTarget.Enabled = false;
            mnuCreateAllObjectsMissingInTarget.Enabled = false;
            mnuSkipAllObjectsWithDifferentDefinitions.Enabled = false;
            mnuUpdateAllObjectsWithDifferentDefinitions.Enabled = false;
            btnValidateSelection.Enabled = false;
            btnUpdate.Enabled = false;
            btnGenerateScript.Enabled = false;
            btnReportDifferences.Enabled = false;
            toolStripStatusLabel1.Text = "";

            ComparisonCtrl.SetNotComparedState();

            _compareState = CompareState.NotCompared;
            SetGridState(false);
        }

        private void SetComparedState()
        {
            btnCompareTabularModels.Enabled = true;
            ddSelectActions.Enabled = true;
            mnuHideSkipObjects.Enabled = true;
            mnuShowSkipObjects.Enabled = true;
            mnuSkipAllObjectsMissingInSource.Enabled = true;
            mnuDeleteAllObjectsMissingInSource.Enabled = true;
            mnuSkipAllObjectsMissingInTarget.Enabled = true;
            mnuCreateAllObjectsMissingInTarget.Enabled = true;
            mnuSkipAllObjectsWithDifferentDefinitions.Enabled = true;
            mnuUpdateAllObjectsWithDifferentDefinitions.Enabled = true;
            btnValidateSelection.Enabled = true;
            btnUpdate.Enabled = false;
            btnGenerateScript.Enabled = false;
            btnReportDifferences.Enabled = true;

            ComparisonCtrl.SetComparedState();

            // NG: Disable skip and other actions for the control here
            _compareState = CompareState.Compared;

            SetGridState(true);
        }

        private void SetValidatedState()
        {
            btnUpdate.Enabled = true;
            btnGenerateScript.Enabled = true;

            _compareState = CompareState.Validated;
            // This method needs to be moved out of comparison control during clean up
            ComparisonCtrl.SetValidatedState();
        }

        private void LoadFile(string fileName)
        {
            try
            {
                if (File.ReadAllText(fileName) == "")
                {
                    //Blank file not saved to yet
                    return;
                }
                _comparisonInfo = ComparisonInfo.DeserializeBsmnFile(fileName);
                ComparisonCtrl.ComparisonInfo = _comparisonInfo;

                PopulateSourceTargetTextBoxes();
            }
            catch (Exception exc)
            {
                MessageBox.Show($"Error loading file {fileName}\n{exc.Message}\n\nPlease save over this file with a new version.", _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                SetNotComparedState();
            }
        }

        public void SaveFile(string fileName)
        {
            try
            {
                ComparisonCtrl.RefreshSkipSelections();

                XmlSerializer writer = new XmlSerializer(typeof(ComparisonInfo));
                StreamWriter file = new System.IO.StreamWriter(fileName);
                writer.Serialize(file, _comparisonInfo);
                file.Close();
            }
            catch (Exception exc)
            {
                MessageBox.Show($"Error saving file {fileName}\n{exc.Message}", _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private bool ShowConnectionsForm()
        {
            //if (ComparisonCtrl.CompareState != CompareState.NotCompared)
            //{
            //    
            //    ComparisonCtrl.RefreshSkipSelections();
            //}

            if (_compareState != CompareState.NotCompared)
            {
                //just in case user has some selections, store them to the SkipSelections collection
                _comparison.RefreshSkipSelectionsFromComparisonObjects();
            }


            Connections connForm = new Connections();
            connForm.ComparisonInfo = _comparisonInfo;
            connForm.StartPosition = FormStartPosition.CenterParent;
            connForm.DpiScaleFactor = _dpiScaleFactor;
            connForm.ShowDialog();
            if (connForm.DialogResult == DialogResult.OK)
            {
                SetNotComparedState();
                return true;
            }
            else return false;
        }

        private void InitializeAndCompareTabularModels()
        {
            try
            {
                string sourceTemp = txtSource.Text;
                string targetTemp = txtTarget.Text;

                if (!ShowConnectionsForm()) return;

                Cursor.Current = Cursors.WaitCursor;
                toolStripStatusLabel1.Text = "ALM Toolkit - comparing models ...";

                PopulateSourceTargetTextBoxes();
                if (sourceTemp != txtSource.Text || targetTemp != txtTarget.Text)
                {
                    // New connections
                    ComparisonCtrl.TriggerComparisonChanged();
                    _comparisonInfo.SkipSelections.Clear();
                }

                this.CompareTabularModels();
                toolStripStatusLabel1.Text = "ALM Toolkit - finished comparing models";
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message, _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                SetNotComparedState();
            }
            finally
            {
                Cursor.Current = Cursors.Default;
            }
        }

        public void CompareTabularModels()
        {
            bool userCancelled;
            _comparison = ComparisonFactory.CreateComparison(_comparisonInfo, out userCancelled);

            if (!userCancelled)
            {
                //_comparison.ValidationMessage += HandleValidationMessage;
                //_comparison.ResizeValidationHeaders += HandleResizeValidationHeaders;
                _comparison.DatabaseDeployment += HandleDatabaseDeployment;
                _comparison.Connect();
                SetAutoComplete();
                _comparison.CompareTabularModels();

                // Avoid conflict for validate with existing control
                //ComparisonCtrl.ComparisonChanged += HandleComparisonChanged;
                ComparisonCtrl.Comparison = _comparison;
                ComparisonCtrl.DataBindComparison();

                _comparisonInter.Comparison = _comparison;
                transformAndRefreshGridControl();

                SetComparedState();
            }
        }

        #region Angular tree control handlers
        private void transformAndRefreshGridControl()
        {
            _comparisonInter.SetComparisonData();
            // Send notification to refresh the grid
            refreshGridControl(false);
        }

        /// <summary>
        /// Send notification to refresh the grid control on UI
        /// </summary>
        public void refreshGridControl(bool mergeActions)
        {
            // Invoke method in Angular
            string script = "window.angularComponentRef.zone.run(() => { window.angularComponentRef.showTree(" + (mergeActions ? "true" : "false") + "); })";
            chromeBrowser.ExecuteScriptAsync(script);
        }

        private void SetGridState(bool showGrid)
        {
            // Check if we need to clear the comparison node and comparison list as well


            // Call Angular method to show/hide grid here
        }
        #endregion



        private void GetFromAutoCompleteSource()
        {
            string serverNameSource = ReverseArray<string>(Settings.Default.SourceServerAutoCompleteEntries.Substring(0,
                Settings.Default.SourceServerAutoCompleteEntries.Length - 1).Split("|".ToCharArray()))[0]; //.Reverse().ToArray();
            //_connectionInfoSource = new ConnectionInfo(serverNameSource, Settings.Default.SourceCatalog);
        }

        private void GetFromAutoCompleteTarget()
        {
            string serverNameTarget = ReverseArray<string>(Settings.Default.TargetServerAutoCompleteEntries.Substring(0,
                Settings.Default.TargetServerAutoCompleteEntries.Length - 1).Split("|".ToCharArray()))[0];
            //_connectionInfoTarget = new ConnectionInfo(serverNameTarget, Settings.Default.TargetCatalog);
        }

        internal static T[] ReverseArray<T>(T[] array)
        {
            T[] newArray = null;
            int count = array == null ? 0 : array.Length;
            if (count > 0)
            {
                newArray = new T[count];
                for (int i = 0, j = count - 1; i < count; i++, j--)
                {
                    newArray[i] = array[j];
                }
            }
            return newArray;
        }

        private void SetAutoComplete()
        {
            if (!_comparisonInfo.ConnectionInfoSource.UseProject)
            {
                if (Settings.Default.SourceServerAutoCompleteEntries.IndexOf(_comparisonInfo.ConnectionInfoSource.ServerName + "|") > -1)
                {
                    Settings.Default.SourceServerAutoCompleteEntries =
                        Settings.Default.SourceServerAutoCompleteEntries.Remove(
                            Settings.Default.SourceServerAutoCompleteEntries.IndexOf(_comparisonInfo.ConnectionInfoSource.ServerName + "|"),
                            (_comparisonInfo.ConnectionInfoSource.ServerName + "|").Length);
                }
                Settings.Default.SourceServerAutoCompleteEntries += _comparisonInfo.ConnectionInfoSource.ServerName + "|";
                Settings.Default.SourceCatalog = _comparisonInfo.ConnectionInfoSource.DatabaseName;

                Settings.Default.Save();
                GetFromAutoCompleteSource();
            }

            if (!_comparisonInfo.ConnectionInfoTarget.UseProject)
            {
                if (Settings.Default.TargetServerAutoCompleteEntries.IndexOf(_comparisonInfo.ConnectionInfoTarget.ServerName + "|") > -1)
                {
                    Settings.Default.TargetServerAutoCompleteEntries =
                        Settings.Default.TargetServerAutoCompleteEntries.Remove(
                            Settings.Default.TargetServerAutoCompleteEntries.IndexOf(_comparisonInfo.ConnectionInfoTarget.ServerName + "|"),
                            (_comparisonInfo.ConnectionInfoTarget.ServerName + "|").Length);
                }
                Settings.Default.TargetServerAutoCompleteEntries += _comparisonInfo.ConnectionInfoTarget.ServerName + "|";
                Settings.Default.TargetCatalog = _comparisonInfo.ConnectionInfoTarget.DatabaseName;

                Settings.Default.Save();
                GetFromAutoCompleteTarget();
            }
        }

        #endregion

        #region Event Handlers

        private void PopulateSourceTargetTextBoxes()
        {
            txtSource.Text = (_comparisonInfo.ConnectionInfoSource.UseProject ? "Project: " + _comparisonInfo.ConnectionInfoSource.ProjectName : "Database: " + _comparisonInfo.ConnectionInfoSource.ServerName + ";" + _comparisonInfo.ConnectionInfoSource.DatabaseName);
            txtTarget.Text = (_comparisonInfo.ConnectionInfoTarget.UseProject ? "Project: " + _comparisonInfo.ConnectionInfoTarget.ProjectName : "Database: " + _comparisonInfo.ConnectionInfoTarget.ServerName + ";" + _comparisonInfo.ConnectionInfoTarget.DatabaseName);

        }

        private void btnGenerateScript_Click(object sender, EventArgs e)
        {
            try
            {
                Cursor.Current = Cursors.WaitCursor;
                toolStripStatusLabel1.Text = "Creating script ...";

                //If we get here, there was a problem generating the xmla file (maybe file item templates not installed), so offer saving to a file instead
                SaveFileDialog saveFile = new SaveFileDialog();
                saveFile.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                saveFile.Filter = "XMLA Files|*.xmla|JSON Files|*.json|Text Files|*.txt|All files|*.*";
                saveFile.CheckFileExists = false;
                if (saveFile.ShowDialog() == DialogResult.OK)
                {
                    File.WriteAllText(saveFile.FileName, _comparison.ScriptDatabase());
                    toolStripStatusLabel1.Text = "ALM Toolkit - finished generating script";
                    MessageBox.Show("Created script\n" + saveFile.FileName, _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message, _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                SetNotComparedState();
            }
            finally
            {
                Cursor.Current = Cursors.Default;
                toolStripStatusLabel1.Text = "";
            }
        }

        private void btnOptions_Click(object sender, EventArgs e)
        {
            Options optionsForm = new Options();
            optionsForm.ComparisonInfo = _comparisonInfo;
            optionsForm.StartPosition = FormStartPosition.CenterParent;
            optionsForm.DpiScaleFactor = _dpiScaleFactor;
            optionsForm.ShowDialog();
            if (optionsForm.DialogResult == DialogResult.OK)
            {
                ComparisonCtrl.TriggerComparisonChanged();
                //if (ComparisonCtrl.CompareState != CompareState.NotCompared)
                //{
                //    SetNotComparedState();
                //    toolStripStatusLabel1.Text = "Comparison invalidated. Please re-run the comparison.";
                //}

                if (_compareState != CompareState.NotCompared)
                {
                    SetNotComparedState();
                    toolStripStatusLabel1.Text = "Comparison invalidated. Please re-run the comparison.";
                }
            }
        }

        private void btnReportDifferences_Click(object sender, EventArgs e)
        {
            try
            {
                Cursor.Current = Cursors.WaitCursor;
                toolStripStatusLabel1.Text = "ALM Toolkit - generating report ...";
                toolStripProgressBar1.Visible = true;
                _comparison.ReportDifferences(toolStripProgressBar1);
                toolStripStatusLabel1.Text = "ALM Toolkit - finished generating report";
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message, _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                toolStripProgressBar1.Visible = false;
                Cursor.Current = Cursors.Default;
            }
        }

        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (keyData == (Keys.Shift | Keys.Alt | Keys.C))
            {
                this.InitializeAndCompareTabularModels();
                return true;
            }

            return base.ProcessCmdKey(ref msg, keyData);
        }

        private void btnCompareTabularModels_Click(object sender, EventArgs e)
        {
            InitializeAndCompareTabularModels();
        }

        private void mnuHideSkipObjects_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(true);

            _comparisonInter.ShowHideSkipNodes(true);
            refreshGridControl(true);
        }

        private void mnuHideSkipObjectsWithSameDefinition_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(true, sameDefinitionFilter: true);

            _comparisonInter.ShowHideSkipNodes(true, sameDefinitionFilter: true);
            refreshGridControl(true);
        }

        private void mnuShowSkipObjects_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);

            _comparisonInter.ShowHideSkipNodes(false);
            refreshGridControl(true);
        }

        private void mnuSkipAllObjectsMissingInSource_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.SkipItems(false, ComparisonObjectStatus.MissingInSource);
            SetComparedState();

            _comparisonInter.SkipItems(false, ComparisonObjectStatus.MissingInSource);
            refreshGridControl(true);
        }

        private void mnuDeleteAllObjectsMissingInSource_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);
            ComparisonCtrl.DeleteItems(false);
            SetComparedState();

            _comparisonInter.ShowHideSkipNodes(false);
            _comparisonInter.DeleteItems(false);
            refreshGridControl(true);
        }

        private void mnuSkipAllObjectsMissingInTarget_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.SkipItems(false, ComparisonObjectStatus.MissingInTarget);
            SetComparedState();

            _comparisonInter.SkipItems(false, ComparisonObjectStatus.MissingInTarget);
            refreshGridControl(true);
        }

        private void mnuCreateAllObjectsMissingInTarget_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);
            ComparisonCtrl.CreateItems(false);
            SetComparedState();

            _comparisonInter.ShowHideSkipNodes(false);
            _comparisonInter.CreateItems(false);
            refreshGridControl(true);
        }

        private void mnuSkipAllObjectsWithDifferentDefinitions_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.SkipItems(false, ComparisonObjectStatus.DifferentDefinitions);
            SetComparedState();

            _comparisonInter.SkipItems(false, ComparisonObjectStatus.DifferentDefinitions);
            refreshGridControl(true);
        }

        private void mnuUpdateAllObjectsWithDifferentDefinitions_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);
            ComparisonCtrl.UpdateItems(false);
            SetComparedState();

            _comparisonInter.ShowHideSkipNodes(false);
            _comparisonInter.UpdateItems(false);
            refreshGridControl(true);
        }

        private void btnValidateSelection_Click(object sender, EventArgs e)
        {
            try
            {
                Cursor.Current = Cursors.WaitCursor;
                toolStripStatusLabel1.Text = "ALM Toolkit - validating ...";

                // Not required since _comparison object is always updated with latest updates
                //ComparisonCtrl.RefreshDiffResultsFromGrid();

                WarningListForm warningList = new WarningListForm();
                warningList.Comparison = _comparison;
                warningList.TreeGridImageList = ComparisonCtrl.TreeGridImageList;
                warningList.StartPosition = FormStartPosition.CenterParent;
                warningList.ShowDialog();

                SetValidatedState();
                toolStripStatusLabel1.Text = "ALM Toolkit - finished validating";
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message, _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                SetNotComparedState();
            }
            finally
            {
                Cursor.Current = Cursors.Default;
            }
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show($"Are you sure you want to update target {(_comparisonInfo.ConnectionInfoTarget.UseProject ? "project" : "database")}?", _appCaption, MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes)
            {
                return;
            }

            try
            {
                Cursor.Current = Cursors.WaitCursor;
                toolStripStatusLabel1.Text = "ALM Toolkit - committing changes ...";
                // Not required since _comparison object is always updated with latest updates
                //ComparisonCtrl.RefreshSkipSelections();

                if (_compareState != CompareState.NotCompared && _comparison != null)
                {
                    _comparison.RefreshSkipSelectionsFromComparisonObjects();

                    bool update = _comparison.Update();
                    toolStripStatusLabel1.Text = "ALM Toolkit - finished committing changes";

                    SetNotComparedState();
                    if (update && MessageBox.Show($"Updated {(_comparisonInfo.ConnectionInfoTarget.UseProject ? "project " + _comparisonInfo.ConnectionInfoTarget.ProjectName : "database " + _comparisonInfo.ConnectionInfoTarget.DatabaseName)}.\n\nDo you want to refresh the comparison?", _appCaption, MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
                    {
                        this.CompareTabularModels();
                    }
                }
                else
                {
                    toolStripStatusLabel1.Text = "ALM Toolkit - require validation for changes";
                }
            }

            catch (Exception exc)
            {
                MessageBox.Show(exc.Message, _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                SetNotComparedState();
            }
            finally
            {
                Cursor.Current = Cursors.Default;
            }
        }

        private void HandleDatabaseDeployment(object sender, DatabaseDeploymentEventArgs e)
        {
            Deployment deployForm = new Deployment();
            deployForm.Comparison = _comparison;
            deployForm.ComparisonInfo = _comparisonInfo;
            deployForm.DpiScaleFactor = _dpiScaleFactor;
            deployForm.StartPosition = FormStartPosition.CenterParent;
            deployForm.ShowDialog();
            e.DeploymentSuccessful = (deployForm.DialogResult == DialogResult.OK);
        }

        private void HandleComparisonChanged(object sender, EventArgs e)
        {
            //If user changes a skip selection after validation, need to disable Update button
            if (ComparisonCtrl.CompareState == CompareState.Validated)
            {
                SetComparedState();
                toolStripStatusLabel1.Text = "ALM Toolkit - models compared";
            }
        }

        public void HandleComparisonChanged()
        {
            //If user changes a skip selection after validation, need to disable Update button
            if (_compareState == CompareState.Validated)
            {
                if (InvokeRequired)
                {
                    this.Invoke(new MethodInvoker(delegate
                    {
                        SetComparedState();
                        toolStripStatusLabel1.Text = "ALM Toolkit - models compared";
                    }));
                }
            }
        }


        #endregion

        #region DPI

        private float _dpiScaleFactor = 1;
        private void Rescale()
        {
            this._dpiScaleFactor = HighDPIUtils.GetDpiFactor();
            if (this._dpiScaleFactor == 1) return;
            float fudgedDpiScaleFactor = _dpiScaleFactor * HighDPIUtils.PrimaryFudgeFactor;

            this.Scale(new SizeF(fudgedDpiScaleFactor, fudgedDpiScaleFactor));

            this.Font = new Font(this.Font.FontFamily,
                                 this.Font.Size * fudgedDpiScaleFactor,
                                 this.Font.Style);
            pnlHeader.Font = new Font(pnlHeader.Font.FontFamily,
                                pnlHeader.Font.Size * fudgedDpiScaleFactor,
                                pnlHeader.Font.Style);

            spltSourceTarget.SplitterDistance = Convert.ToInt32(Convert.ToDouble(spltSourceTarget.Width) * 0.5);
            pnlHeader.Height = Convert.ToInt32(toolStrip1.Height * 2.3); // Convert.ToInt32(pnlHeader.Height * fudgedDpiScaleFactor * 0.68);
            txtSource.Width = Convert.ToInt32(Convert.ToDouble(Convert.ToDouble(spltSourceTarget.Width) * 0.5) * 0.8);
            txtSource.Left = Convert.ToInt32(txtSource.Left * fudgedDpiScaleFactor * 0.9);
            txtTarget.Width = Convert.ToInt32(Convert.ToDouble(Convert.ToDouble(spltSourceTarget.Width) * 0.5) * 0.8);
            txtTarget.Left = Convert.ToInt32(txtTarget.Left * fudgedDpiScaleFactor * 0.9);
        }

        #endregion

    }
}

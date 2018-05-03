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
using BismNormalizer.TabularCompare.UI;

namespace AlmToolkit
{
    public partial class ComparisonForm : Form
    {
        #region Private Members

        private const string _appCaption = "ALM Toolkit for Power BI";

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

        #region (Mainly) Private Methods

        public ComparisonForm()
        {
            InitializeComponent();
        }

        private void ComparisonForm_Load(object sender, EventArgs e)
        {
            GetFromAutoCompleteSource();
            GetFromAutoCompleteTarget();

            //hdpi
            Rescale();
        }

        private void SetNotComparedState()
        {
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
            StatusBarComparsion.Text = "";

            ComparisonCtrl.SetNotComparedState();
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
        }

        private void SetValidatedState()
        {
            btnUpdate.Enabled = true;
            btnGenerateScript.Enabled = true;

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
                ComparisonCtrl.ComparisonInfo = ComparisonInfo.DeserializeBsmnFile(fileName);

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
                writer.Serialize(file, ComparisonCtrl.ComparisonInfo);
                file.Close();
            }
            catch (Exception exc)
            {
                MessageBox.Show($"Error saving file {fileName}\n{exc.Message}", _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private bool ShowConnectionsForm()
        {
            if (ComparisonCtrl.CompareState != CompareState.NotCompared)
            {
                //just in case user has some selections, store them to the SkipSelections collection
                ComparisonCtrl.RefreshSkipSelections();
            }

            Connections connForm = new Connections();
            connForm.ComparisonInfo = ComparisonCtrl.ComparisonInfo;
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

                PopulateSourceTargetTextBoxes();
                if (sourceTemp != txtSource.Text || targetTemp != txtTarget.Text)
                {
                    // New connections
                    ComparisonCtrl.TriggerComparisonChanged();
                    ComparisonCtrl.ComparisonInfo.SkipSelections.Clear();
                }

                Cursor.Current = Cursors.WaitCursor;
                StatusBarComparsion.Text = "ALM Toolkit - comparing models ...";
                ComparisonCtrl.CompareTabularModels();
                StatusBarComparsion.Text = "ALM Toolkit - finished comparing models";
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
            ComparisonCtrl.Comparison = ComparisonFactory.CreateComparison(ComparisonCtrl.ComparisonInfo, out userCancelled);

            if (!userCancelled)
            {
                ComparisonCtrl.Comparison.ValidationMessage += HandleValidationMessage;
                ComparisonCtrl.Comparison.ResizeValidationHeaders += HandleResizeValidationHeaders;
                ComparisonCtrl.Comparison.DatabaseDeployment += HandleDatabaseDeployment;
                ComparisonCtrl.Comparison.Connect();
                SetAutoComplete();
                ComparisonCtrl.Comparison.CompareTabularModels();
                SetComparedState();
            }
        }

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
            if (!ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.UseProject)
            {
                if (Settings.Default.SourceServerAutoCompleteEntries.IndexOf(ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.ServerName + "|") > -1)
                {
                    Settings.Default.SourceServerAutoCompleteEntries =
                        Settings.Default.SourceServerAutoCompleteEntries.Remove(
                            Settings.Default.SourceServerAutoCompleteEntries.IndexOf(ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.ServerName + "|"),
                            (ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.ServerName + "|").Length);
                }
                Settings.Default.SourceServerAutoCompleteEntries += ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.ServerName + "|";
                Settings.Default.SourceCatalog = ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.DatabaseName;

                Settings.Default.Save();
                GetFromAutoCompleteSource();
            }

            if (!ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.UseProject)
            {
                if (Settings.Default.TargetServerAutoCompleteEntries.IndexOf(ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ServerName + "|") > -1)
                {
                    Settings.Default.TargetServerAutoCompleteEntries =
                        Settings.Default.TargetServerAutoCompleteEntries.Remove(
                            Settings.Default.TargetServerAutoCompleteEntries.IndexOf(ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ServerName + "|"),
                            (ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ServerName + "|").Length);
                }
                Settings.Default.TargetServerAutoCompleteEntries += ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ServerName + "|";
                Settings.Default.TargetCatalog = ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.DatabaseName;

                Settings.Default.Save();
                GetFromAutoCompleteTarget();
            }
        }

        #endregion

        #region Event Handlers

        private void PopulateSourceTargetTextBoxes()
        {
            txtSource.Text = (ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.UseProject ? "Project: " + ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.ProjectName : "Database: " + ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.ServerName + ";" + ComparisonCtrl.ComparisonInfo.ConnectionInfoSource.DatabaseName);
            txtTarget.Text = (ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.UseProject ? "Project: " + ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ProjectName : "Database: " + ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ServerName + ";" + ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.DatabaseName);

        }

        private void btnGenerateScript_Click(object sender, EventArgs e)
        {
            try
            {
                Cursor.Current = Cursors.WaitCursor;
                StatusBarComparsion.Text = "Creating script ...";

                //string script = ComparisonCtrl.Comparison.ScriptDatabase(); //doing this here in case errors before opening file in VS
                //Document file = NewXmlaFile(ComparisonCtrl.Comparison.CompatibilityLevel >= 1200, (ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.UseProject ? ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ProjectName : ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.DatabaseName));
                //if (file != null)
                //{
                //    TextSelection selection = (TextSelection)file.Selection;
                //    selection.SelectAll();
                //    selection.Insert(script);
                //    selection.GotoLine(1);

                //    return;
                //}

                //If we get here, there was a problem generating the xmla file (maybe file item templates not installed), so offer saving to a file instead
                SaveFileDialog saveFile = new SaveFileDialog();
                saveFile.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                if (ComparisonCtrl.Comparison.CompatibilityLevel >= 1200)
                {
                    saveFile.Filter = "JSON Files|*.json|Text Files|*.txt|All files|*.*";
                }
                else
                {
                    saveFile.Filter = "XMLA Files|*.xmla|Text Files|*.txt|All files|*.*";
                }
                saveFile.CheckFileExists = false;
                if (saveFile.ShowDialog() == DialogResult.OK)
                {
                    File.WriteAllText(saveFile.FileName, ComparisonCtrl.Comparison.ScriptDatabase());
                    StatusBarComparsion.Text = "ALM Toolkit - finished generating script";
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
                StatusBarComparsion.Text = "";
            }
        }

        private void btnOptions_Click(object sender, EventArgs e)
        {
            Options optionsForm = new Options();
            optionsForm.ComparisonInfo = ComparisonCtrl.ComparisonInfo;
            optionsForm.StartPosition = FormStartPosition.CenterParent;
            optionsForm.DpiScaleFactor = _dpiScaleFactor;
            optionsForm.ShowDialog();
            if (optionsForm.DialogResult == DialogResult.OK)
            {
                ComparisonCtrl.TriggerComparisonChanged();
                if (ComparisonCtrl.CompareState != CompareState.NotCompared)
                {
                    SetNotComparedState();
                    StatusBarComparsion.Text = "Comparison invalidated. Please re-run the comparison.";
                }
            }
        }

        private void btnReportDifferences_Click(object sender, EventArgs e)
        {
            try
            {
                Cursor.Current = Cursors.WaitCursor;
                StatusBarComparsion.Text = "ALM Toolkit - generating report ...";
                StatusProgressBar.Visible = true;
                ComparisonCtrl.Comparison.ReportDifferences(StatusProgressBar);
                StatusBarComparsion.Text = "ALM Toolkit - finished generating report";
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message, _appCaption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                StatusProgressBar.Visible = false;
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
        }

        private void mnuHideSkipObjectsWithSameDefinition_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(true, sameDefinitionFilter: true);
        }

        private void mnuShowSkipObjects_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);
        }

        private void mnuSkipAllObjectsMissingInSource_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.SkipItems(false, ComparisonObjectStatus.MissingInSource);
            SetComparedState();
        }

        private void mnuDeleteAllObjectsMissingInSource_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);
            ComparisonCtrl.DeleteItems(false);
            SetComparedState();
        }

        private void mnuSkipAllObjectsMissingInTarget_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.SkipItems(false, ComparisonObjectStatus.MissingInTarget);
            SetComparedState();
        }

        private void mnuCreateAllObjectsMissingInTarget_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);
            ComparisonCtrl.CreateItems(false);
            SetComparedState();
        }

        private void mnuSkipAllObjectsWithDifferentDefinitions_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.SkipItems(false, ComparisonObjectStatus.DifferentDefinitions);
            SetComparedState();
        }

        private void mnuUpdateAllObjectsWithDifferentDefinitions_Click(object sender, EventArgs e)
        {
            ComparisonCtrl.ShowHideNodes(false);
            ComparisonCtrl.UpdateItems(false);
            SetComparedState();
        }

        private void btnValidateSelection_Click(object sender, EventArgs e)
        {
            try
            {
                //TODO: when set up validation window
                //if (_bismNormalizerPackage.ValidationOutput == null)
                //{
                //    //this should set up the tool window and then can refer to _bismNormalizerPackage.ValidationOutput
                //    _bismNormalizerPackage.InitializeToolWindowInternal(_dpiScaleFactor);
                //}
                //else
                //{
                //    _bismNormalizerPackage.ShowToolWindow();
                //}

                Cursor.Current = Cursors.WaitCursor;
                StatusBarComparsion.Text = "ALM Toolkit - validating ...";
                ComparisonCtrl.RefreshDiffResultsFromGrid();

                //TODO: when set up validation window
                //_bismNormalizerPackage.ValidationOutput.ClearMessages(this.ComparisonEditorPane.Window.Handle.ToInt32());
                //_bismNormalizerPackage.ValidationOutput.SetImageList(TreeGridImageList);

                ComparisonCtrl.Comparison.ValidateSelection();
                SetValidatedState();
                StatusBarComparsion.Text = "ALM Toolkit - finished validating";
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
            if (MessageBox.Show($"Are you sure you want to update target {(ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.UseProject ? "project" : "database")}?", _appCaption, MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes)
            {
                return;
            }

            try
            {
                Cursor.Current = Cursors.WaitCursor;
                StatusBarComparsion.Text = "ALM Toolkit - committing changes ...";
                ComparisonCtrl.RefreshSkipSelections();
                bool update = ComparisonCtrl.Comparison.Update();
                StatusBarComparsion.Text = "ALM Toolkit - finished committing changes";

                SetNotComparedState();
                if (update && MessageBox.Show($"Updated {(ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.UseProject ? "project " + ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.ProjectName : "database " + ComparisonCtrl.ComparisonInfo.ConnectionInfoTarget.DatabaseName)}.\n\nDo you want to refresh the comparison?", _appCaption, MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
                {
                    this.CompareTabularModels();
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

        private void HandleValidationMessage(object sender, ValidationMessageEventArgs e)
        {
            //TODO: Hook up validation screen and handle message
            //BismNormalizerPackage.ValidationOutput.ShowStatusMessage(
            //    ComparisonEditorPane.Window.Handle.ToInt32(),
            //    ComparisonEditorPane.Name,
            //    e.Message,
            //    e.ValidationMessageType,
            //    e.ValidationMessageStatus);
        }

        private void HandleResizeValidationHeaders(object sender, EventArgs e)
        {
            //TODO when hook up validation screen 
            //BismNormalizerPackage.ValidationOutput.ResizeValidationHeaders();
        }

        private void HandleDatabaseDeployment(object sender, DatabaseDeploymentEventArgs e)
        {
            Deployment deployForm = new Deployment();
            deployForm.Comparison = ComparisonCtrl.Comparison;
            deployForm.ComparisonInfo = ComparisonCtrl.ComparisonInfo;
            deployForm.DpiScaleFactor = _dpiScaleFactor;
            deployForm.StartPosition = FormStartPosition.CenterParent;
            deployForm.ShowDialog();
            e.DeploymentSuccessful = (deployForm.DialogResult == DialogResult.OK);
        }

        #endregion
    }
}

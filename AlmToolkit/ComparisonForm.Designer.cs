namespace AlmToolkit
{
    partial class ComparisonForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ComparisonForm));
            BismNormalizer.TabularCompare.ComparisonInfo comparisonInfo1 = new BismNormalizer.TabularCompare.ComparisonInfo();
            BismNormalizer.TabularCompare.ConnectionInfo connectionInfo1 = new BismNormalizer.TabularCompare.ConnectionInfo();
            BismNormalizer.TabularCompare.ConnectionInfo connectionInfo2 = new BismNormalizer.TabularCompare.ConnectionInfo();
            BismNormalizer.TabularCompare.OptionsInfo optionsInfo1 = new BismNormalizer.TabularCompare.OptionsInfo();
            this.pnlHeader = new System.Windows.Forms.Panel();
            this.spltSourceTarget = new System.Windows.Forms.SplitContainer();
            this.label1 = new System.Windows.Forms.Label();
            this.txtSource = new System.Windows.Forms.TextBox();
            this.txtTarget = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.toolStrip1 = new System.Windows.Forms.ToolStrip();
            this.btnCompareTabularModels = new System.Windows.Forms.ToolStripButton();
            this.ddSelectActions = new System.Windows.Forms.ToolStripDropDownButton();
            this.mnuHideSkipObjects = new System.Windows.Forms.ToolStripMenuItem();
            this.hideSkipObjectsWithSameDefinitionToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuShowSkipObjects = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuSkipAllObjectsMissingInSource = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDeleteAllObjectsMissingInSource = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuSkipAllObjectsMissingInTarget = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuCreateAllObjectsMissingInTarget = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuSkipAllObjectsWithDifferentDefinitions = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuUpdateAllObjectsWithDifferentDefinitions = new System.Windows.Forms.ToolStripMenuItem();
            this.btnValidateSelection = new System.Windows.Forms.ToolStripButton();
            this.btnUpdate = new System.Windows.Forms.ToolStripButton();
            this.btnGenerateScript = new System.Windows.Forms.ToolStripButton();
            this.toolStripButton1 = new System.Windows.Forms.ToolStripSeparator();
            this.btnOptions = new System.Windows.Forms.ToolStripButton();
            this.btnReportDifferences = new System.Windows.Forms.ToolStripButton();
            this.StatusBarComparsion = new System.Windows.Forms.StatusStrip();
            this.toolStripStatusLabel1 = new System.Windows.Forms.ToolStripStatusLabel();
            this.toolStripProgressBar1 = new System.Windows.Forms.ToolStripProgressBar();
            this.ComparisonCtrl = new AlmToolkit.ComparisonControl();
            this.pnlHeader.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spltSourceTarget)).BeginInit();
            this.spltSourceTarget.Panel1.SuspendLayout();
            this.spltSourceTarget.Panel2.SuspendLayout();
            this.spltSourceTarget.SuspendLayout();
            this.toolStrip1.SuspendLayout();
            this.StatusBarComparsion.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlHeader
            // 
            this.pnlHeader.Controls.Add(this.spltSourceTarget);
            this.pnlHeader.Controls.Add(this.toolStrip1);
            this.pnlHeader.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlHeader.Location = new System.Drawing.Point(0, 0);
            this.pnlHeader.Name = "pnlHeader";
            this.pnlHeader.Size = new System.Drawing.Size(979, 55);
            this.pnlHeader.TabIndex = 47;
            // 
            // spltSourceTarget
            // 
            this.spltSourceTarget.Dock = System.Windows.Forms.DockStyle.Fill;
            this.spltSourceTarget.IsSplitterFixed = true;
            this.spltSourceTarget.Location = new System.Drawing.Point(0, 25);
            this.spltSourceTarget.Name = "spltSourceTarget";
            // 
            // spltSourceTarget.Panel1
            // 
            this.spltSourceTarget.Panel1.Controls.Add(this.label1);
            this.spltSourceTarget.Panel1.Controls.Add(this.txtSource);
            // 
            // spltSourceTarget.Panel2
            // 
            this.spltSourceTarget.Panel2.Controls.Add(this.txtTarget);
            this.spltSourceTarget.Panel2.Controls.Add(this.label2);
            this.spltSourceTarget.Size = new System.Drawing.Size(979, 30);
            this.spltSourceTarget.SplitterDistance = 479;
            this.spltSourceTarget.TabIndex = 45;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(2, 8);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(41, 13);
            this.label1.TabIndex = 39;
            this.label1.Text = "Source";
            // 
            // txtSource
            // 
            this.txtSource.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtSource.BackColor = System.Drawing.SystemColors.Control;
            this.txtSource.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.txtSource.Location = new System.Drawing.Point(49, 7);
            this.txtSource.Name = "txtSource";
            this.txtSource.Size = new System.Drawing.Size(427, 20);
            this.txtSource.TabIndex = 41;
            // 
            // txtTarget
            // 
            this.txtTarget.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtTarget.BackColor = System.Drawing.SystemColors.Control;
            this.txtTarget.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.txtTarget.Location = new System.Drawing.Point(45, 7);
            this.txtTarget.Name = "txtTarget";
            this.txtTarget.Size = new System.Drawing.Size(440, 20);
            this.txtTarget.TabIndex = 42;
            // 
            // label2
            // 
            this.label2.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(3, 8);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(38, 13);
            this.label2.TabIndex = 40;
            this.label2.Text = "Target";
            // 
            // toolStrip1
            // 
            this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.btnCompareTabularModels,
            this.ddSelectActions,
            this.btnValidateSelection,
            this.btnUpdate,
            this.btnGenerateScript,
            this.toolStripButton1,
            this.btnOptions,
            this.btnReportDifferences});
            this.toolStrip1.Location = new System.Drawing.Point(0, 0);
            this.toolStrip1.Name = "toolStrip1";
            this.toolStrip1.Size = new System.Drawing.Size(979, 25);
            this.toolStrip1.TabIndex = 1;
            this.toolStrip1.Text = "toolStrip1";
            // 
            // btnCompareTabularModels
            // 
            this.btnCompareTabularModels.Image = ((System.Drawing.Image)(resources.GetObject("btnCompareTabularModels.Image")));
            this.btnCompareTabularModels.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnCompareTabularModels.Name = "btnCompareTabularModels";
            this.btnCompareTabularModels.Size = new System.Drawing.Size(85, 22);
            this.btnCompareTabularModels.Text = "Compare...";
            this.btnCompareTabularModels.ToolTipText = "Compare (Shift+Alt+C)";
            this.btnCompareTabularModels.Click += new System.EventHandler(this.btnCompareTabularModels_Click);
            // 
            // ddSelectActions
            // 
            this.ddSelectActions.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuHideSkipObjects,
            this.hideSkipObjectsWithSameDefinitionToolStripMenuItem,
            this.mnuShowSkipObjects,
            this.toolStripSeparator1,
            this.mnuSkipAllObjectsMissingInSource,
            this.mnuDeleteAllObjectsMissingInSource,
            this.mnuSkipAllObjectsMissingInTarget,
            this.mnuCreateAllObjectsMissingInTarget,
            this.mnuSkipAllObjectsWithDifferentDefinitions,
            this.mnuUpdateAllObjectsWithDifferentDefinitions});
            this.ddSelectActions.Enabled = false;
            this.ddSelectActions.Image = ((System.Drawing.Image)(resources.GetObject("ddSelectActions.Image")));
            this.ddSelectActions.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.ddSelectActions.Name = "ddSelectActions";
            this.ddSelectActions.Size = new System.Drawing.Size(110, 22);
            this.ddSelectActions.Text = "Select Actions";
            // 
            // mnuHideSkipObjects
            // 
            this.mnuHideSkipObjects.Name = "mnuHideSkipObjects";
            this.mnuHideSkipObjects.Size = new System.Drawing.Size(303, 22);
            this.mnuHideSkipObjects.Text = "Hide Skip Objects";
            this.mnuHideSkipObjects.Click += new System.EventHandler(this.mnuHideSkipObjects_Click);
            // 
            // hideSkipObjectsWithSameDefinitionToolStripMenuItem
            // 
            this.hideSkipObjectsWithSameDefinitionToolStripMenuItem.Name = "hideSkipObjectsWithSameDefinitionToolStripMenuItem";
            this.hideSkipObjectsWithSameDefinitionToolStripMenuItem.Size = new System.Drawing.Size(303, 22);
            this.hideSkipObjectsWithSameDefinitionToolStripMenuItem.Text = "Hide Skip Objects with Same Definition";
            this.hideSkipObjectsWithSameDefinitionToolStripMenuItem.Click += new System.EventHandler(this.mnuHideSkipObjectsWithSameDefinition_Click);
            // 
            // mnuShowSkipObjects
            // 
            this.mnuShowSkipObjects.Name = "mnuShowSkipObjects";
            this.mnuShowSkipObjects.Size = new System.Drawing.Size(303, 22);
            this.mnuShowSkipObjects.Text = "Show Skip Objects";
            this.mnuShowSkipObjects.Click += new System.EventHandler(this.mnuShowSkipObjects_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(300, 6);
            // 
            // mnuSkipAllObjectsMissingInSource
            // 
            this.mnuSkipAllObjectsMissingInSource.Name = "mnuSkipAllObjectsMissingInSource";
            this.mnuSkipAllObjectsMissingInSource.Size = new System.Drawing.Size(303, 22);
            this.mnuSkipAllObjectsMissingInSource.Text = "Skip all objects Missing in Source";
            this.mnuSkipAllObjectsMissingInSource.Click += new System.EventHandler(this.mnuSkipAllObjectsMissingInSource_Click);
            // 
            // mnuDeleteAllObjectsMissingInSource
            // 
            this.mnuDeleteAllObjectsMissingInSource.Name = "mnuDeleteAllObjectsMissingInSource";
            this.mnuDeleteAllObjectsMissingInSource.Size = new System.Drawing.Size(303, 22);
            this.mnuDeleteAllObjectsMissingInSource.Text = "Delete all objects Missing in Source";
            this.mnuDeleteAllObjectsMissingInSource.Click += new System.EventHandler(this.mnuDeleteAllObjectsMissingInSource_Click);
            // 
            // mnuSkipAllObjectsMissingInTarget
            // 
            this.mnuSkipAllObjectsMissingInTarget.Name = "mnuSkipAllObjectsMissingInTarget";
            this.mnuSkipAllObjectsMissingInTarget.Size = new System.Drawing.Size(303, 22);
            this.mnuSkipAllObjectsMissingInTarget.Text = "Skip all objects Missing in Target";
            this.mnuSkipAllObjectsMissingInTarget.Click += new System.EventHandler(this.mnuSkipAllObjectsMissingInTarget_Click);
            // 
            // mnuCreateAllObjectsMissingInTarget
            // 
            this.mnuCreateAllObjectsMissingInTarget.Name = "mnuCreateAllObjectsMissingInTarget";
            this.mnuCreateAllObjectsMissingInTarget.Size = new System.Drawing.Size(303, 22);
            this.mnuCreateAllObjectsMissingInTarget.Text = "Create all objects Missing in Target";
            this.mnuCreateAllObjectsMissingInTarget.Click += new System.EventHandler(this.mnuCreateAllObjectsMissingInTarget_Click);
            // 
            // mnuSkipAllObjectsWithDifferentDefinitions
            // 
            this.mnuSkipAllObjectsWithDifferentDefinitions.Name = "mnuSkipAllObjectsWithDifferentDefinitions";
            this.mnuSkipAllObjectsWithDifferentDefinitions.Size = new System.Drawing.Size(303, 22);
            this.mnuSkipAllObjectsWithDifferentDefinitions.Text = "Skip all objects with Different Definitions";
            this.mnuSkipAllObjectsWithDifferentDefinitions.Click += new System.EventHandler(this.mnuSkipAllObjectsWithDifferentDefinitions_Click);
            // 
            // mnuUpdateAllObjectsWithDifferentDefinitions
            // 
            this.mnuUpdateAllObjectsWithDifferentDefinitions.Name = "mnuUpdateAllObjectsWithDifferentDefinitions";
            this.mnuUpdateAllObjectsWithDifferentDefinitions.Size = new System.Drawing.Size(303, 22);
            this.mnuUpdateAllObjectsWithDifferentDefinitions.Text = "Update all objects with Different Definitions";
            this.mnuUpdateAllObjectsWithDifferentDefinitions.Click += new System.EventHandler(this.mnuUpdateAllObjectsWithDifferentDefinitions_Click);
            // 
            // btnValidateSelection
            // 
            this.btnValidateSelection.Enabled = false;
            this.btnValidateSelection.Image = ((System.Drawing.Image)(resources.GetObject("btnValidateSelection.Image")));
            this.btnValidateSelection.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnValidateSelection.Name = "btnValidateSelection";
            this.btnValidateSelection.Size = new System.Drawing.Size(119, 22);
            this.btnValidateSelection.Text = "Validate Selection";
            this.btnValidateSelection.Click += new System.EventHandler(this.btnValidateSelection_Click);
            // 
            // btnUpdate
            // 
            this.btnUpdate.Enabled = false;
            this.btnUpdate.Image = ((System.Drawing.Image)(resources.GetObject("btnUpdate.Image")));
            this.btnUpdate.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnUpdate.Name = "btnUpdate";
            this.btnUpdate.Size = new System.Drawing.Size(65, 22);
            this.btnUpdate.Text = "Update";
            this.btnUpdate.Click += new System.EventHandler(this.btnUpdate_Click);
            // 
            // btnGenerateScript
            // 
            this.btnGenerateScript.Enabled = false;
            this.btnGenerateScript.Image = ((System.Drawing.Image)(resources.GetObject("btnGenerateScript.Image")));
            this.btnGenerateScript.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnGenerateScript.Name = "btnGenerateScript";
            this.btnGenerateScript.Size = new System.Drawing.Size(107, 22);
            this.btnGenerateScript.Text = "Generate Script";
            this.btnGenerateScript.Click += new System.EventHandler(this.btnGenerateScript_Click);
            // 
            // toolStripButton1
            // 
            this.toolStripButton1.Name = "toolStripButton1";
            this.toolStripButton1.Size = new System.Drawing.Size(6, 25);
            // 
            // btnOptions
            // 
            this.btnOptions.Image = ((System.Drawing.Image)(resources.GetObject("btnOptions.Image")));
            this.btnOptions.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnOptions.Name = "btnOptions";
            this.btnOptions.Size = new System.Drawing.Size(69, 22);
            this.btnOptions.Text = "Options";
            this.btnOptions.Click += new System.EventHandler(this.btnOptions_Click);
            // 
            // btnReportDifferences
            // 
            this.btnReportDifferences.Enabled = false;
            this.btnReportDifferences.Image = ((System.Drawing.Image)(resources.GetObject("btnReportDifferences.Image")));
            this.btnReportDifferences.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnReportDifferences.Name = "btnReportDifferences";
            this.btnReportDifferences.Size = new System.Drawing.Size(124, 22);
            this.btnReportDifferences.Text = "Report Differences";
            this.btnReportDifferences.Click += new System.EventHandler(this.btnReportDifferences_Click);
            // 
            // StatusBarComparsion
            // 
            this.StatusBarComparsion.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripStatusLabel1,
            this.toolStripProgressBar1});
            this.StatusBarComparsion.Location = new System.Drawing.Point(0, 636);
            this.StatusBarComparsion.Name = "StatusBarComparsion";
            this.StatusBarComparsion.Size = new System.Drawing.Size(979, 22);
            this.StatusBarComparsion.TabIndex = 48;
            this.StatusBarComparsion.Text = "Comparison Status";
            // 
            // toolStripStatusLabel1
            // 
            this.toolStripStatusLabel1.Name = "toolStripStatusLabel1";
            this.toolStripStatusLabel1.Size = new System.Drawing.Size(0, 17);
            // 
            // toolStripProgressBar1
            // 
            this.toolStripProgressBar1.Name = "toolStripProgressBar1";
            this.toolStripProgressBar1.Size = new System.Drawing.Size(100, 16);
            this.toolStripProgressBar1.Visible = false;
            // 
            // ComparisonCtrl
            // 
            this.ComparisonCtrl.CompareState = AlmToolkit.CompareState.NotCompared;
            this.ComparisonCtrl.Comparison = null;
            connectionInfo1.DatabaseName = null;
            connectionInfo1.ProjectFile = null;
            connectionInfo1.ProjectName = null;
            connectionInfo1.ServerName = null;
            connectionInfo1.UseProject = false;
            comparisonInfo1.ConnectionInfoSource = connectionInfo1;
            connectionInfo2.DatabaseName = null;
            connectionInfo2.ProjectFile = null;
            connectionInfo2.ProjectName = null;
            connectionInfo2.ServerName = null;
            connectionInfo2.UseProject = false;
            comparisonInfo1.ConnectionInfoTarget = connectionInfo2;
            optionsInfo1.OptionActions = false;
            optionsInfo1.OptionAffectedTables = false;
            optionsInfo1.OptionCultures = false;
            optionsInfo1.OptionMeasureDependencies = true;
            optionsInfo1.OptionMergeCultures = true;
            optionsInfo1.OptionMergePerspectives = true;
            optionsInfo1.OptionPartitions = true;
            optionsInfo1.OptionPerspectives = true;
            optionsInfo1.OptionProcessingOption = BismNormalizer.TabularCompare.ProcessingOption.DoNotProcess;
            optionsInfo1.OptionRetainPartitions = true;
            optionsInfo1.OptionRoles = true;
            optionsInfo1.OptionTransaction = false;
            comparisonInfo1.OptionsInfo = optionsInfo1;
            comparisonInfo1.PromptForDatabaseProcessing = false;
            this.ComparisonCtrl.ComparisonInfo = comparisonInfo1;
            this.ComparisonCtrl.Dock = System.Windows.Forms.DockStyle.Left;
            this.ComparisonCtrl.Location = new System.Drawing.Point(0, 55);
            this.ComparisonCtrl.Name = "ComparisonCtrl";
            this.ComparisonCtrl.Size = new System.Drawing.Size(979, 581);
            this.ComparisonCtrl.TabIndex = 1;
            // 
            // ComparisonForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(979, 658);
            this.Controls.Add(this.ComparisonCtrl);
            this.Controls.Add(this.StatusBarComparsion);
            this.Controls.Add(this.pnlHeader);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "ComparisonForm";
            this.Text = "ALM Toolkit for Power BI - by MAQ Software & Microsoft";
            this.Load += new System.EventHandler(this.ComparisonForm_Load);
            this.Shown += new System.EventHandler(this.ComparisonForm_Shown);
            this.pnlHeader.ResumeLayout(false);
            this.pnlHeader.PerformLayout();
            this.spltSourceTarget.Panel1.ResumeLayout(false);
            this.spltSourceTarget.Panel1.PerformLayout();
            this.spltSourceTarget.Panel2.ResumeLayout(false);
            this.spltSourceTarget.Panel2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.spltSourceTarget)).EndInit();
            this.spltSourceTarget.ResumeLayout(false);
            this.toolStrip1.ResumeLayout(false);
            this.toolStrip1.PerformLayout();
            this.StatusBarComparsion.ResumeLayout(false);
            this.StatusBarComparsion.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel pnlHeader;
        private System.Windows.Forms.SplitContainer spltSourceTarget;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtSource;
        private System.Windows.Forms.TextBox txtTarget;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ToolStrip toolStrip1;
        private System.Windows.Forms.ToolStripButton btnCompareTabularModels;
        private System.Windows.Forms.ToolStripDropDownButton ddSelectActions;
        private System.Windows.Forms.ToolStripMenuItem mnuHideSkipObjects;
        private System.Windows.Forms.ToolStripMenuItem hideSkipObjectsWithSameDefinitionToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem mnuShowSkipObjects;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        private System.Windows.Forms.ToolStripMenuItem mnuSkipAllObjectsMissingInSource;
        private System.Windows.Forms.ToolStripMenuItem mnuDeleteAllObjectsMissingInSource;
        private System.Windows.Forms.ToolStripMenuItem mnuSkipAllObjectsMissingInTarget;
        private System.Windows.Forms.ToolStripMenuItem mnuCreateAllObjectsMissingInTarget;
        private System.Windows.Forms.ToolStripMenuItem mnuSkipAllObjectsWithDifferentDefinitions;
        private System.Windows.Forms.ToolStripMenuItem mnuUpdateAllObjectsWithDifferentDefinitions;
        private System.Windows.Forms.ToolStripButton btnValidateSelection;
        private System.Windows.Forms.ToolStripButton btnUpdate;
        private System.Windows.Forms.ToolStripButton btnGenerateScript;
        private System.Windows.Forms.ToolStripSeparator toolStripButton1;
        private System.Windows.Forms.ToolStripButton btnOptions;
        private System.Windows.Forms.ToolStripButton btnReportDifferences;
        private System.Windows.Forms.StatusStrip StatusBarComparsion;
        private ComparisonControl ComparisonCtrl;
        private System.Windows.Forms.ToolStripStatusLabel toolStripStatusLabel1;
        private System.Windows.Forms.ToolStripProgressBar toolStripProgressBar1;
    }
}


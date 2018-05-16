namespace AlmToolkit
{
    partial class WarningListForm
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
            this.btnOK = new System.Windows.Forms.Button();
            this.validationOutput = new BismNormalizer.TabularCompare.UI.ValidationOutput();
            this.panelOk = new System.Windows.Forms.Panel();
            this.panelGrid = new System.Windows.Forms.Panel();
            this.panelOk.SuspendLayout();
            this.panelGrid.SuspendLayout();
            this.SuspendLayout();
            // 
            // btnOK
            // 
            this.btnOK.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnOK.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnOK.Location = new System.Drawing.Point(609, 12);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(75, 23);
            this.btnOK.TabIndex = 20;
            this.btnOK.Text = "OK";
            this.btnOK.UseVisualStyleBackColor = true;
            // 
            // validationOutput
            // 
            this.validationOutput.Dock = System.Windows.Forms.DockStyle.Fill;
            this.validationOutput.Location = new System.Drawing.Point(0, 0);
            this.validationOutput.Name = "validationOutput";
            this.validationOutput.Size = new System.Drawing.Size(696, 342);
            this.validationOutput.TabIndex = 22;
            // 
            // panelOk
            // 
            this.panelOk.Controls.Add(this.btnOK);
            this.panelOk.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panelOk.Location = new System.Drawing.Point(0, 342);
            this.panelOk.Name = "panelOk";
            this.panelOk.Size = new System.Drawing.Size(696, 47);
            this.panelOk.TabIndex = 23;
            // 
            // panelGrid
            // 
            this.panelGrid.Controls.Add(this.validationOutput);
            this.panelGrid.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelGrid.Location = new System.Drawing.Point(0, 0);
            this.panelGrid.Name = "panelGrid";
            this.panelGrid.Size = new System.Drawing.Size(696, 342);
            this.panelGrid.TabIndex = 24;
            // 
            // WarningListForm
            // 
            this.AcceptButton = this.btnOK;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.CancelButton = this.btnOK;
            this.ClientSize = new System.Drawing.Size(696, 389);
            this.Controls.Add(this.panelGrid);
            this.Controls.Add(this.panelOk);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.SizableToolWindow;
            this.Name = "WarningListForm";
            this.Text = "Warning List";
            this.Load += new System.EventHandler(this.WarningListForm_Load);
            this.Shown += new System.EventHandler(this.WarningListForm_Shown);
            this.panelOk.ResumeLayout(false);
            this.panelGrid.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Button btnOK;
        private BismNormalizer.TabularCompare.UI.ValidationOutput validationOutput;
        private System.Windows.Forms.Panel panelOk;
        private System.Windows.Forms.Panel panelGrid;
    }
}
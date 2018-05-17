import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as monaco from 'monaco-editor';
import { ComparisonTree } from '../shared/model/comparison-tree';

@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.css']
})

export class CodeeditorComponent implements OnChanges {

  @Input() comparisonData: ComparisonTree;

  constructor() { }

  ngOnChanges(changes) {
    this.embedEditor();
  }

  /**
   * Embed the diff editor below the grid
   */
  embedEditor(): void {
    if (!this.comparisonData) {
      return;
    }
    const sourceDataModel = monaco.editor.createModel(this.comparisonData.SourceObjectDefinition, 'text/plain');
    const targetDataModel = monaco.editor.createModel(this.comparisonData.TargetObjectDefinition, 'text/plain');

    // if the container already contains an editor, remove it
    const codeEditorContainer = document.getElementById('code-editor-container');
    if (codeEditorContainer.firstChild) {
      codeEditorContainer.removeChild(codeEditorContainer.firstChild);
    }

    const diffEditor = monaco.editor.createDiffEditor(codeEditorContainer);
    diffEditor.setModel({
      original: sourceDataModel,
      modified: targetDataModel
    });
  }
}

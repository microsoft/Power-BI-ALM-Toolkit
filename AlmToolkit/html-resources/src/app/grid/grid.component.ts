import { Component, OnInit, NgZone } from '@angular/core';
import { GridDataService } from '../service/grid-data.service';
import { ComparisonNode } from '../shared/model/comparison-node';
import { CodeeditorComponent as codeeditor } from '../codeeditor/codeeditor.component';
import { AppLogService } from '../app-log/app-log.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  comparisonDataToDisplay: ComparisonNode[] = [];
  selectedObject: ComparisonNode;

  constructor(private gridService: GridDataService, private appLog: AppLogService, private zone: NgZone) {
    window['angularComponentRef'] = {
      zone: this.zone,
      showTree: () => this.getDataToDisplay(),
      getTree: () => this.getGridData()
    };
  }

  ngOnInit() {
    this.getDataToDisplay();
  }

  /**
    * Handle selection for each row on comparison tree
    * @param objectSelected - Clicked node on comparison tree
    */
  onSelect(objectSelected: ComparisonNode, event: Event): void {
    this.appLog.add('Grid: Row selected', 'info');
    const selectedRows = document.getElementsByClassName('selected-row');

    for (let iRowCounter = 0; iRowCounter < selectedRows.length; iRowCounter += 1) {
      selectedRows[iRowCounter].classList.remove('selected-row');
    }
    const rowId = 'node-' + objectSelected.Id;
    document.getElementById(rowId).classList.add('selected-row');
    this.selectedObject = objectSelected;
  }

  /**
   * Handle the change of option in drop-down
   * @param id - Id of the node changed
   * @param option - New selected options
   */
  optionChange(id: number, option: string) {
    let oldOption: string;
    oldOption = this.comparisonDataToDisplay.find(node => node.Id === id).MergeAction;
    this.comparisonDataToDisplay.find(node => node.Id === id).MergeAction = option;
    this.gridService.sendChange(id, option, oldOption);
  }

  /**
   * Return the image location as per the node type or the action selected
   * @param imageType - Node type or the Action selected
   * @param type - type based on if it is node icon or selected action
   */
  getImage(nodeData: ComparisonNode, type: number) {
    let roleImageLocation: string;
    if (type === 1) {
      roleImageLocation = './assets/node-type-' + nodeData.NodeType.replace(' ', '-') + '.png';
    } else if (type === 2) {
      if ( nodeData.Status.toLowerCase() === 'same definition' ) {
            roleImageLocation = './assets/action-Skip-Grey.png';
      } else {
        roleImageLocation = './assets/action-' + nodeData.MergeAction.replace(' ', '-') + '.png';
      }
    }
    return roleImageLocation;
  }


  /**
   * Returns the style to be used to indent the row
   * @param nodeLevel - Level of the node
   */
  getIndentLevel(nodeLevel: number): string {
    const indentValue = nodeLevel * 20 + 5;
    return indentValue + 'px';
  }

  /**
   * Get the data to be displayed from service
   */
  getDataToDisplay(): void {
    this.appLog.add('Grid: Get users called', 'info');
    this.gridService.getGridDataToDisplay().subscribe(
      (data) => {
        this.comparisonDataToDisplay = data;
      }
    );
    // if the container already contains an editor, remove it
    const codeEditorContainer = document.getElementById('code-editor-container');
    if (codeEditorContainer.firstChild) {
      codeEditorContainer.removeChild(codeEditorContainer.firstChild);
    }
  }

  /**
   * Get grid data to send to C# application
   */
  getGridData(): string {
    this.appLog.add('Grid: Sending data to C#', 'info');
    return JSON.stringify(this.comparisonDataToDisplay);
  }
}

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
    * @param event - Event to check if CTRL key was pressed
    */
  onSelect(objectSelected: ComparisonNode, event: any): void {
    this.appLog.add('Grid: Row selected', 'info');
    const rowId = 'node-' + objectSelected.Id;
    const controlKeyDown = event.ctrlKey;

    // Remove the transparent background color from existing cells
    const transparentCells = document.querySelectorAll('.transparent-cell');

    if (!controlKeyDown) {
      for (let iTransparentCellCounter = 0; iTransparentCellCounter < transparentCells.length; iTransparentCellCounter += 1) {
        transparentCells[iTransparentCellCounter].classList.remove('transparent-cell');
      }
    }
    

    // Get the greyed out cells in the selected row to make them transparent
    const greyedOutCells = document.querySelectorAll('#' + rowId + ' .greyed-out-cell');

    for (let iCellCounter = 0; iCellCounter < greyedOutCells.length; iCellCounter += 1) {
      greyedOutCells[iCellCounter].classList.add('transparent-cell');
    }
    

    // Remove selection from already selected rows
    const selectedRows = document.querySelectorAll('.selected-row');

    if(!controlKeyDown){
      for (let iRowCounter = 0; iRowCounter < selectedRows.length; iRowCounter += 1) {
        selectedRows[iRowCounter].classList.remove('selected-row');
      }
    }
    

    // Highlight the currently selected row
    document.getElementById(rowId).classList.add('selected-row');
    this.selectedObject = objectSelected;
  }


  /**
    * Handle key events on the grid
    * @param event - Check if the key pressed requires selection of rows
    */
  onKeydown(event: any) {

    event.preventDefault();
    let siblingRow;
    // Handle up arrow and down arrow alone
    if ((event.which === 38 || event.which === 40) && !event.ctrlKey && !event.shiftKey) {
      const selectedRows = document.querySelectorAll('.selected-row');
      for (let iRowCounter = 0; iRowCounter < selectedRows.length; iRowCounter++) {
        selectedRows[iRowCounter].classList.remove('selected-row');
      }

      // Remove the transparent background color from existing cells
      const transparentCells = document.querySelectorAll('.transparent-cell');
      for (let iTransparentCellCounter = 0; iTransparentCellCounter < transparentCells.length; iTransparentCellCounter += 1) {
        transparentCells[iTransparentCellCounter].classList.remove('transparent-cell');
      }

      if (event.which === 38) {
        siblingRow = document.getElementById(event.target.id).previousSibling;
      }
      else {
        siblingRow = document.getElementById(event.target.id).nextSibling;
      }
    }

    // Handle shift up and shift down
    else if (event.shiftKey && !event.ctrlKey && (event.which === 38 || event.which === 40)) {
      if (event.which === 38) {
        siblingRow = document.getElementById(event.target.id).previousSibling;
      }
      else {
        siblingRow = document.getElementById(event.target.id).nextSibling;
      }
    }
    
    siblingRow.classList.add('selected-row');
    siblingRow.focus();
    let rowId = siblingRow.id;

    // Get the greyed out cells in the selected row to make them transparent
    const greyedOutCells = document.querySelectorAll('#' + rowId + ' .greyed-out-cell');

    for (let iCellCounter = 0; iCellCounter < greyedOutCells.length; iCellCounter += 1) {
      greyedOutCells[iCellCounter].classList.add('transparent-cell');
    }

    rowId = rowId.split('node-')[1];
    this.selectedObject = this.comparisonDataToDisplay.find(comparisonNode => comparisonNode.Id === parseInt(rowId, 10));
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
        if (this.comparisonDataToDisplay.length > 0) {
          this.selectedObject = this.comparisonDataToDisplay[0];
        }
      }
    );
  }

  /**
   * Get grid data to send to C# application
   */
  getGridData(): string {
    this.appLog.add('Grid: Sending data to C#', 'info');
    return JSON.stringify(this.comparisonDataToDisplay);
  }
}

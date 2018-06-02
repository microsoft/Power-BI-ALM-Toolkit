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
  selectedNodes: number[] = [];
  showContextMenu = false;
  direction;
  oldDirection;
  lastSelectedRow;
  treeControlContextMenuX = 0;
  treeControlContextMenuY = 0;
  selectedCell;
  isDataAvailable = false;
  intervalId;
  constructor(private gridService: GridDataService, private appLog: AppLogService, private zone: NgZone) {
    window['angularComponentRef'] = {
      zone: this.zone,
      showTree: (mergeActions: boolean) => this.getDataToDisplay(mergeActions),
      getTree: () => this.getGridData(),
      clearTree: (dataCompared: boolean) => this.clearGrid(dataCompared)
    };
  }

  ngOnInit() {
    this.getDataToDisplay(false);
  }

  /**
   * Clear the data object when the compared state is set to false
   * @param dataCompared - Comparison status
   */
  clearGrid(dataCompared: boolean) {
    if (!dataCompared) {
      this.comparisonDataToDisplay = [];
    }
  }

  /**
   * Perform row selection when disabled dropdown is clicked
   */
  onDisableDropdownClick() {
    this.appLog.add('Disabled dropdown clicked', 'info');
  }

  /**
   * Focus on first row and bind click events to elements
   * @param checkData- complete data to match the count of rendered elements and actual nodes
   */
  bindElements(checkData: ComparisonNode[]) {
    if (!this.isDataAvailable) {
      let disabledDropdowns;
      const gridRow = document.querySelectorAll('.grid-data-row');

      const dataRowCount = gridRow.length;

      if (checkData && dataRowCount === checkData.length) {
        this.isDataAvailable = true;
        disabledDropdowns = document.querySelectorAll('.dropdown-disabled');
        for (let dropdownCounter = 0; dropdownCounter < disabledDropdowns.length; dropdownCounter += 1) {
          disabledDropdowns[dropdownCounter].onclick = this.onDisableDropdownClick;
        }
        const firstDataCell = <HTMLElement>gridRow[0].firstElementChild;
        this.appLog.add('Focus on first cell', 'info')
        firstDataCell.focus();
        this.appLog.add('Finding focus element', 'info');
        let focused = document.activeElement;
        if (!focused || focused == document.body) {
          this.appLog.add('Focus element was not correct', 'info');
          focused = null;
        } else if (document.querySelector) {
          this.appLog.add('Finding focus using :focus', 'info');
          focused = document.querySelector(":focus");
          if (focused) {
            this.appLog.add('Focus element', 'info');
          }
        }
        clearInterval(this.intervalId);

      }
    }
  }

  /**
   * Handle right click on grid
   * @param event - Event to get the position clicked
   */
  showTreeControlContextMenu(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.clientX) {
      this.treeControlContextMenuX = event.clientX;
      this.treeControlContextMenuY = event.clientY;
    } else {
      const comparisonGrid = <HTMLElement>document.getElementById('comparison-grid');
      this.treeControlContextMenuX = Number((comparisonGrid.offsetHeight / 3).toFixed(2));
      this.treeControlContextMenuY = Number((comparisonGrid.offsetWidth / 3).toFixed(2));
    }
    this.showContextMenu = true;
    this.selectedCell = event.target.id;
  }

  /**
    * Handle selection for each row on comparison tree
    * @param objectSelected - Clicked node on comparison tree
    * @param event - Event to check if CTRL key was pressed
    */
  onSelect(objectSelected: ComparisonNode, event: any): void {
    event.stopPropagation();
    this.showContextMenu = false;
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

    if (!controlKeyDown) {
      this.selectedNodes = [];
      for (let iRowCounter = 0; iRowCounter < selectedRows.length; iRowCounter += 1) {
        selectedRows[iRowCounter].classList.remove('selected-row');
      }
    }


    // Highlight the currently selected row
    if (this.selectedNodes.indexOf(objectSelected.Id) === -1) {
      document.getElementById(rowId).classList.add('selected-row');
      this.selectedNodes.push(objectSelected.Id);
      this.lastSelectedRow = document.getElementById(rowId);
    } else {
      document.getElementById(rowId).classList.remove('selected-row');
      this.selectedNodes.splice(this.selectedNodes.indexOf(objectSelected.Id), 1);
    }

    this.selectedObject = objectSelected;
  }

  /**
    * Handle key events on the grid
    * @param event - Check if the key pressed requires selection of rows
    */
  onKeydown(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.showContextMenu = false;

    if (event.which === 93) {
      this.showTreeControlContextMenu(event);
      return false;
    }
    let siblingRow;
    let eventRow;
    let columnType;
    let nodeSelected: ComparisonNode;
    eventRow = event.target.parentElement;
    columnType = document.getElementById(event.target.id).getAttribute('data-column-type');

    // Remove the transparent background color from existing cells
    const transparentCells = document.querySelectorAll('.transparent-cell');
    for (let iTransparentCellCounter = 0; iTransparentCellCounter < transparentCells.length; iTransparentCellCounter += 1) {
      transparentCells[iTransparentCellCounter].classList.remove('transparent-cell');
    }

    // Handle up arrow, down arrow, Shift+Up, Shift+Down
    if (event.which === 38 || event.which === 40) {
      if (!event.ctrlKey) {
        // If shift key is not pressed its a single select
        if (!event.shiftKey) {
          // Checking if the column in focus is dropdown
          // If yes, change the option else empty the selected list and select the current row
          if (columnType === 'action-dropdown') {
            let dropdownElement: HTMLSelectElement;
            dropdownElement = <HTMLSelectElement>document.getElementById(event.target.id).firstElementChild;
            nodeSelected = this.comparisonDataToDisplay
              .find(comparisonNode => comparisonNode.Id === parseInt(event.target.id.split('node-')[1], 10));
            const selectedOption = dropdownElement.selectedOptions[0];
            const oldOption = selectedOption.innerHTML;
            if (event.which === 38) {
              siblingRow = this.getSiblingElement(true, selectedOption.id);
            } else {
              siblingRow = this.getSiblingElement(false, selectedOption.id);
            }
            if (siblingRow) {
              if (event.which === 38) {
                dropdownElement.selectedIndex = dropdownElement.selectedIndex - 1;
              } else {
                dropdownElement.selectedIndex = dropdownElement.selectedIndex + 1;
              }
              const option = dropdownElement.selectedOptions[0].innerHTML;
              if (option !== oldOption) {
                this.gridService.sendChange(nodeSelected.Id, option, oldOption);
                this.getDataToDisplay(true);
              }
            }
          } else {
            this.selectedNodes = [];
            const selectedRows = document.querySelectorAll('.selected-row');
            for (let iRowCounter = 0; iRowCounter < selectedRows.length; iRowCounter++) {
              selectedRows[iRowCounter].classList.remove('selected-row');
            }
          }
        }

        // Select previous/next row (Up, Down, Shift+Up, Shift+Down)
        if (columnType !== 'action-dropdown') {
          // Find the sibling based on the key pressed
          if (event.which === 38) {
            siblingRow = this.getSiblingElement(true, eventRow.id);
          } else {
            siblingRow = this.getSiblingElement(false, eventRow.id);
          }

          if (!(siblingRow && siblingRow.classList.contains('grid-data-row'))) {
            siblingRow = eventRow;
          }
          // Select the current row
          let rowId = siblingRow.id;
          document.getElementById(rowId + '-' + columnType).focus();

          // Set this as current object so that editor can be refreshed
          rowId = rowId.split('node-')[1];
          nodeSelected = this.comparisonDataToDisplay.find(comparisonNode => comparisonNode.Id === parseInt(rowId, 10));

          if (this.selectedNodes.indexOf(nodeSelected.Id) === -1) {
            siblingRow.classList.add('selected-row');
            this.selectedNodes.push(nodeSelected.Id);
            this.lastSelectedRow = siblingRow;
          } else {
            siblingRow.classList.remove('selected-row');
            this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
          }


          this.selectedObject = nodeSelected;
        }
      } else {
        // This is for Ctrl+Shift+Up and Ctrl+Shift+Down
        if (event.shiftKey) {
          let isSiblingAvailable = true;
          let prev = true;
          let rowId;
          let comparisonTable;
          let firstRow;
          let lastRow;
          // Decide if previous elements are to be fetched or next elements
          if (event.which === 38) {
            this.direction = 'up';
            prev = true;
          } else {
            this.direction = 'down';
            prev = false;
          }

          // If last selected row exists, get its ID
          if (this.lastSelectedRow) {
            rowId = this.lastSelectedRow.id;
            nodeSelected = this.comparisonDataToDisplay
              .find(comparisonNode => comparisonNode.Id === parseInt(rowId.split('node-')[1], 10));
          }

          // if the direction changes and lastSelectedRow is not same as 
          if (this.oldDirection && this.oldDirection !== this.direction
            && this.lastSelectedRow && this.lastSelectedRow !== eventRow) {
            if (this.selectedNodes.indexOf(nodeSelected.Id) > -1) {
              this.lastSelectedRow.classList.remove('selected-row');
              this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
            } else {
              this.lastSelectedRow.classList.add('selected-row');
              this.selectedNodes.push(nodeSelected.Id);
            }
          }
          comparisonTable = document.getElementById('comparison-grid');
          firstRow = this.getSiblingElement(false, comparisonTable.firstElementChild.firstElementChild.id);
          lastRow = comparisonTable.firstElementChild.lastElementChild;
          rowId = eventRow.id;
          nodeSelected = this.comparisonDataToDisplay
            .find(comparisonNode => comparisonNode.Id === parseInt(rowId.split('node-')[1], 10));
          if (this.oldDirection && this.oldDirection !== this.direction
            && (firstRow === eventRow || lastRow === eventRow)) {
            if (this.selectedNodes.indexOf(nodeSelected.Id) > -1) {
              eventRow.classList.remove('selected-row');
              this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
            } else {
              eventRow.classList.add('selected-row');
              this.selectedNodes.push(nodeSelected.Id);
            }
          }
          this.oldDirection = this.direction;
          // Find all elements above or below this row and select them as well
          while (isSiblingAvailable) {
            siblingRow = this.getSiblingElement(prev, rowId);
            if (siblingRow && siblingRow.classList && siblingRow.classList.contains('grid-data-row')) {
              rowId = siblingRow.id;
              document.getElementById(rowId + '-' + columnType).focus();
              nodeSelected = this.comparisonDataToDisplay
                .find(comparisonNode => comparisonNode.Id === parseInt(rowId.split('node-')[1], 10));
              this.selectedObject = nodeSelected;

              if (this.selectedNodes.indexOf(nodeSelected.Id) === -1) {
                siblingRow.classList.add('selected-row');
                this.selectedNodes.push(nodeSelected.Id);
              } else {
                siblingRow.classList.remove('selected-row');
                this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
              }

              siblingRow.focus();
              siblingRow = this.getSiblingElement(prev, rowId);
            } else {
              isSiblingAvailable = false;
            }
          }
        }
      }
    } else if ((event.which === 37 || event.which === 39 || event.which === 9) && !event.ctrlKey && !event.shiftKey) {
      // To handle left and right keys
      let prev = true;
      let rowChild;
      if (event.which === 39 || event.which === 9) {
        prev = false;
      }
      siblingRow = this.getSiblingElement(prev, event.target.id);
      if (!siblingRow) {
        columnType = document.getElementById(event.target.id).getAttribute('data-column-type');
        eventRow.classList.remove('selected-row');
        nodeSelected = this.comparisonDataToDisplay
          .find(comparisonNode => comparisonNode.Id === parseInt(eventRow.id.split('node-')[1], 10));
        if (this.selectedNodes.indexOf(nodeSelected.Id) > -1) {
          this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
        }

        siblingRow = this.getSiblingElement(prev, eventRow.id);
        nodeSelected = this.comparisonDataToDisplay
          .find(comparisonNode => comparisonNode.Id === parseInt(siblingRow.id.split('node-')[1], 10));
        this.selectedObject = nodeSelected;
        if (this.selectedNodes.indexOf(nodeSelected.Id) === -1) {
          siblingRow.classList.add('selected-row');
          this.selectedNodes.push(nodeSelected.Id);
        } else {
          siblingRow.classList.remove('selected-row');
          this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
        }

        if (prev) {
          rowChild = document.getElementById(siblingRow.id).lastElementChild;
        } else {
          rowChild = document.getElementById(siblingRow.id).firstElementChild;
        }
        document.getElementById(rowChild.id).focus();
      } else {
        siblingRow.focus();
      }
    }

    // Get the greyed out cells in the selected row to make them transparent
    const greyedOutCells = document.querySelectorAll('.selected-row .greyed-out-cell');

    for (let iCellCounter = 0; iCellCounter < greyedOutCells.length; iCellCounter += 1) {
      greyedOutCells[iCellCounter].classList.add('transparent-cell');
    }
  }

  /**
   * Get the sibling for the elements
   * @param prev - True if previous sibling is to be fetched and false if next sibling is to be fetched
   * @param id - Id of the element for which sibling is to be fetched
   */
  getSiblingElement(prev: boolean, id: string): Node {
    if (prev) {
      return document.getElementById(id).previousElementSibling;
    } else {
      return document.getElementById(id).nextElementSibling;
    }
  }

  /**
   * Handle the change of option in drop-down
   * @param id - Id of the node changed
   * @param option - New selected options
   */
  optionChange(id: number, option: string) {
    let oldOption: string;
    oldOption = this.comparisonDataToDisplay.find(node => node.Id === id).MergeAction;
    this.gridService.sendChange(id, option, oldOption);
    this.getDataToDisplay(true);
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
      if (nodeData.DropdownDisabled) {
        roleImageLocation = './assets/action-' + nodeData.MergeAction.replace(' ', '-') + '-Grey' + '.png';
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
  getDataToDisplay(mergeActions: boolean): void {
    this.gridService.getGridDataToDisplay().subscribe(
      (data) => {
        if (mergeActions) {
          this.changeOptions(data);
        } else {
          this.isDataAvailable = false;
          this.comparisonDataToDisplay = data;
          const checkData = this.comparisonDataToDisplay;
          if (this.comparisonDataToDisplay.length > 0) {
            this.selectedObject = this.comparisonDataToDisplay[0];
            const that = this;
            const methodToCall = function () {
              that.bindElements(checkData);
            }
            this.intervalId = setInterval(methodToCall, 1000);
          }
        }
        this.showContextMenu = false;
      }
    );
  }

  /**
   * Change the options by comparing the existing object with the one returned from C# application
   * @param changedData - Data returned from C# application
   */
  changeOptions(changedData: ComparisonNode[]) {
    let nodeId: number;
    let gridNode: ComparisonNode;
    for (let iRowCounter = 0; iRowCounter < changedData.length; iRowCounter += 1) {
      nodeId = changedData[iRowCounter].Id;
      gridNode = this.comparisonDataToDisplay.find(node => node.Id === nodeId);
      gridNode.MergeAction = changedData[iRowCounter].MergeAction;
      gridNode.DropdownDisabled = changedData[iRowCounter].DropdownDisabled;
      gridNode.DisableMessage = changedData[iRowCounter].DisableMessage;
      gridNode.ShowNode = changedData[iRowCounter].ShowNode;
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

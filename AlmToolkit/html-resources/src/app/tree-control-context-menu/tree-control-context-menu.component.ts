import { Component, OnInit, Input } from '@angular/core';
import { GridDataService } from '../service/grid-data.service';
import { AppLogService } from '../app-log/app-log.service';

@Component({
  selector: 'app-tree-control-context-menu',
  templateUrl: './tree-control-context-menu.component.html',
  styleUrls: ['./tree-control-context-menu.component.css']
})
export class TreeControlContextMenuComponent implements OnInit {

  @Input() contextMenuPositionX = 0;
  @Input() contextMenuPositionY = 0;
  @Input() selectedNodes = [];
  constructor(private gridService: GridDataService, private appLog: AppLogService) { }

  ngOnInit() {
  }

  /**
   * Perform action on selected nodes based on action and status selected
   * @param action - the action to be performed
   * @param status - the status of objects for which action is to be performed
   */
  performAction(action: string, status: string) {
    this.gridService.sendSelectedNodesAndAction(action, status, this.selectedNodes);
  }

  /**
   * Handle key events on context menu
   * @param event - Take appropriate actions if key events are on context menu
   */
  onKeydown(event: any) {
    let siblingRow;
    if (event.which === 38) {
      siblingRow = this.getSiblingElement(true, event.target.id);
    } else {
      siblingRow = this.getSiblingElement(false, event.target.id);
    }
    if (!siblingRow) {
      if (event.which === 38) {
        siblingRow = document.getElementById(event.target.id).parentElement.lastElementChild;
      } else {
        siblingRow = document.getElementById(event.target.id).parentElement.firstElementChild;
      }
    }
    siblingRow.focus();
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
}

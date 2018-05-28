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
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AppLogService } from '../app-log/app-log.service';
import { WindowReferenceService } from './window-reference.service';

import { DatabaseSourceData } from '../shared/mocks/data-list';
import { ComparisonTree } from '../shared/model/comparison-tree';

@Injectable()
export class GridDataService {

  private _window: Window;
  private databaseObjects: ComparisonTree[];

  constructor(private logService: AppLogService, private windowRef: WindowReferenceService) {
    this._window = this.windowRef.nativeWindow;
  }

  /**
   * Get the data from the C# application
   */
  getGridDataToDisplay(): Observable<ComparisonTree[]> {
    this.logService.add('Grid data service: Getting data from C#', 'info');
    return fromPromise(this._window['comparisonJSInteraction']
      .getComparisonList())
      .pipe(map((data: string) => JSON.parse(data)));
  }

  /**
   * Send the change done to the C# application
   * @param id - Id of the node for which action was changed
   * @param newAction - The updated action
   * @param oldAction - The old action that was selected
   */
  sendChange(id: number, newAction: string, oldAction: string): void {
    this.logService.add('Grid data service: Updating C# object on change in element', 'info');
    this._window['comparisonJSInteraction'].changeOccurred(id, newAction, oldAction);
  }
}

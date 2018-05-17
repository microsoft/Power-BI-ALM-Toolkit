import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { GridDataService } from './service/grid-data.service';
import { AppLogService } from './app-log/app-log.service';
import { CodeeditorComponent } from './codeeditor/codeeditor.component';
import { WindowReferenceService } from './service/window-reference.service';


@NgModule({
    declarations: [
        AppComponent,
        GridComponent,
        CodeeditorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        GridDataService,
        AppLogService
        , WindowReferenceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

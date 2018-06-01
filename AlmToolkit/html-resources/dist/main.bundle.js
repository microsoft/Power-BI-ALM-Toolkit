webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-log/app-log.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppLogService = /** @class */ (function () {
    function AppLogService() {
        this.messages = [];
    }
    /**
     * Get the entire data in the heirarchical format
     * @param message - Message to be logged
     * @param entryType - Can be one of the following: Warn: Log as warning; Error: Log as error; Info: Log as info. Defaults to info
     */
    AppLogService.prototype.add = function (message, entryType) {
        this.messages.push(message);
        entryType = entryType ? entryType.toLowerCase() : '';
        switch (entryType) {
            case 'warn':
                console.warn(message);
                break;
            case 'error':
                console.error(message);
                break;
            case 'info':
            default:
                console.log(message);
        }
    };
    /**
     * Clear the message log
     */
    AppLogService.prototype.clear = function () {
        this.messages = [];
        if (!__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production) {
            console.clear();
        }
    };
    AppLogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])()
    ], AppLogService);
    return AppLogService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-grid></app-grid>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__grid_grid_component__ = __webpack_require__("./src/app/grid/grid.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_grid_data_service__ = __webpack_require__("./src/app/service/grid-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_log_app_log_service__ = __webpack_require__("./src/app/app-log/app-log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__codeeditor_codeeditor_component__ = __webpack_require__("./src/app/codeeditor/codeeditor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_window_reference_service__ = __webpack_require__("./src/app/service/window-reference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tree_control_context_menu_tree_control_context_menu_component__ = __webpack_require__("./src/app/tree-control-context-menu/tree-control-context-menu.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__grid_grid_component__["a" /* GridComponent */],
                __WEBPACK_IMPORTED_MODULE_7__codeeditor_codeeditor_component__["a" /* CodeeditorComponent */],
                __WEBPACK_IMPORTED_MODULE_9__tree_control_context_menu_tree_control_context_menu_component__["a" /* TreeControlContextMenuComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__service_grid_data_service__["a" /* GridDataService */],
                __WEBPACK_IMPORTED_MODULE_6__app_log_app_log_service__["a" /* AppLogService */],
                __WEBPACK_IMPORTED_MODULE_8__service_window_reference_service__["a" /* WindowReferenceService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/codeeditor/codeeditor.component.css":
/***/ (function(module, exports) {

module.exports = "#code-editor-container {\r\n    height: 100%;\r\n}\r\n\r\n#code-editor-section{\r\n  margin-top:20px;\r\n  height: 250px;\r\n  width:100%;\r\n  border: 1px solid rgba(112, 112, 112, 0.64);\r\n}\r\n"

/***/ }),

/***/ "./src/app/codeeditor/codeeditor.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"code-editor-section\">\r\n  <div id=\"code-editor-container\">\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/codeeditor/codeeditor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeeditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_monaco_editor__ = __webpack_require__("./node_modules/monaco-editor/esm/vs/editor/editor.main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_model_comparison_node__ = __webpack_require__("./src/app/shared/model/comparison-node.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CodeeditorComponent = /** @class */ (function () {
    function CodeeditorComponent() {
    }
    CodeeditorComponent.prototype.ngOnChanges = function (changes) {
        this.embedEditor();
    };
    /**
     * Embed the diff editor below the grid
     */
    CodeeditorComponent.prototype.embedEditor = function () {
        if (!this.comparisonData) {
            return;
        }
        var sourceDataModel = __WEBPACK_IMPORTED_MODULE_1_monaco_editor__["a" /* editor */].createModel(this.comparisonData.SourceObjectDefinition, 'json');
        var targetDataModel = __WEBPACK_IMPORTED_MODULE_1_monaco_editor__["a" /* editor */].createModel(this.comparisonData.TargetObjectDefinition, 'json');
        // if the container already contains an editor, remove it
        var codeEditorContainer = document.getElementById('code-editor-container');
        if (codeEditorContainer.firstChild) {
            codeEditorContainer.removeChild(codeEditorContainer.firstChild);
        }
        var diffEditor = __WEBPACK_IMPORTED_MODULE_1_monaco_editor__["a" /* editor */].createDiffEditor(codeEditorContainer, {
            scrollBeyondLastLine: false,
            automaticLayout: true
        });
        diffEditor.setModel({
            original: sourceDataModel,
            modified: targetDataModel
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__shared_model_comparison_node__["a" /* ComparisonNode */])
    ], CodeeditorComponent.prototype, "comparisonData", void 0);
    CodeeditorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-codeeditor',
            template: __webpack_require__("./src/app/codeeditor/codeeditor.component.html"),
            styles: [__webpack_require__("./src/app/codeeditor/codeeditor.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CodeeditorComponent);
    return CodeeditorComponent;
}());



/***/ }),

/***/ "./src/app/grid/grid.component.css":
/***/ (function(module, exports) {

module.exports = "#comparison-table-container {\r\n    height: 650px;\r\n    overflow-y: auto;\r\n    background-color: #F2F2F2;\r\n}\r\n\r\n#comparison-grid {\r\n    border: 1px solid rgba(112, 112, 112, 0.64);\r\n    margin: 10px;\r\n    border-collapse: collapse;\r\n    background-color: #FFF;\r\n}\r\n\r\n.grid-column {\r\n    padding: 1px;\r\n    border: 1px solid rgba(112, 112, 112, 0.64);\r\n    max-width: 300px;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n}\r\n\r\n.grid-column:focus {\r\n    outline: 1px dotted #000;\r\n}\r\n\r\n.grid-data-row, .grid-row {\r\n    font-weight: 600;\r\n    font-size: 12px;\r\n    font-family: 'Segoe UI';\r\n    color: #000;\r\n    height: 10px;\r\n}\r\n\r\n.hide-row {\r\n    display: none;\r\n}\r\n\r\n.greyed-out-cell {\r\n    background-color: #D3D3D3;\r\n}\r\n\r\n.action-dropdown {\r\n    width: 75px;\r\n    font-size: 12px;\r\n    font-weight: 600;\r\n    font-family: 'Segoe UI';\r\n    color: #000;\r\n}\r\n\r\n.action-options select{\r\n  border:none;\r\n  background-color:transparent;\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAnCAIAAAAHNBZfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABrSURBVFhH7dZBCoAwDETR6FVy/yPlLgbsQiiCU4Yu5L9NXeVTK9ijqmKjc6y70POi50XPi54XPS/hf5uZ42nyfYiwv7eh0g1Be5/zaCnW5PN7BtRYW/le7sxCrHE/86LnRc+Lnhc9r3/3Ii5LZh/JjmvMaAAAAABJRU5ErkJggg==);\r\n  background-repeat: no-repeat;\r\n  background-size: 25px 25px;\r\n  background-position: center right;\r\n}\r\n\r\n.action-options select:focus{\r\n  outline: none;\r\n}\r\n\r\n.action-options .action-dropdown option:hover{\r\n  background-color: #0078d7;\r\n}\r\n\r\n.action-dropdown:disabled{\r\n  color: #707070;\r\n}\r\n\r\n.selected-row .action-dropdown{\r\n  color: #FFF;\r\n}\r\n\r\n.selected-row .action-dropdown option{\r\n  color: #000;\r\n}\r\n\r\n.node-images {\r\n    height: 15px;\r\n    width: 15px;\r\n}\r\n\r\n.node-type {\r\n    position: relative;\r\n    top: -3px;\r\n}\r\n\r\n.selected-row {\r\n    background-color: #0078d7;\r\n    color: #FFF;\r\n}\r\n\r\n.transparent-cell {\r\n    background-color: transparent;\r\n}\r\n"

/***/ }),

/***/ "./src/app/grid/grid.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf='comparisonDataToDisplay.length > 0' id='comparison-table-container'>\r\n  <table id='comparison-grid' (contextmenu)='showTreeControlContextMenu($event)'>\r\n    <tr id='header-row' class='grid-row'>\r\n      <td class='grid-column node-type-column'>Type</td>\r\n      <td class='grid-column source-name-column'>Source Name</td>\r\n      <td class='grid-column status-column'>Status</td>\r\n      <td class='grid-column target-name-column'>Target Name</td>\r\n      <td class='grid-column action-icon-column'></td>\r\n      <td class='grid-column grid-column action-options'>Action</td>\r\n\r\n    </tr>\r\n    <tr *ngFor='let dataObject of comparisonDataToDisplay; let first = first' class='grid-data-row object-level-{{dataObject.Level}}'\r\n      [class.hide-row]='!dataObject.ShowNode' [class.selected-row]='first' id='node-{{dataObject.Id}}'>\r\n      <td class='grid-column node-type-column' [style.padding-left]='getIndentLevel(dataObject.Level)' (click)='onSelect(dataObject, $event)'\r\n        title='{{dataObject.NodeType}}' tabindex='0' (keydown)='onKeydown($event)' id='node-{{dataObject.Id}}-node-type' [class.first-column] = 'first' data-column-type='node-type'>\r\n        <span>\r\n          <img [src]='getImage(dataObject,1)' class='node-images' />\r\n        </span>\r\n        <span class='node-type'>{{dataObject.NodeType}}</span>\r\n      </td>\r\n      <td class='grid-column source-name-column' [style.padding-left]='getIndentLevel(dataObject.Level)' (click)='onSelect(dataObject, $event)'\r\n        [class.greyed-out-cell]='!dataObject.SourceName' [class.transparent-cell]='first' title='{{dataObject.SourceName}}'\r\n        tabindex='0' (keydown)='onKeydown($event)' id='node-{{dataObject.Id}}-source-name' data-column-type='source-name'>{{dataObject.SourceName}} </td>\r\n      <td class='grid-column status-column' (click)='onSelect(dataObject, $event)' title='{{dataObject.Status}}' id='node-{{dataObject.Id}}-status'\r\n        data-column-type='status' tabindex='0' (keydown)='onKeydown($event)'>{{dataObject.Status}}</td>\r\n      <td class='grid-column target-name-column' [style.padding-left]='getIndentLevel(dataObject.Level)' (click)='onSelect(dataObject, $event)'\r\n        [class.greyed-out-cell]='!dataObject.TargetName' [class.transparent-cell]='first' title='{{dataObject.TargetName}}'\r\n        id='node-{{dataObject.Id}}-target-name' data-column-type='target-name' tabindex='0' (keydown)='onKeydown($event)'>{{dataObject.TargetName}}</td>\r\n      <td class='grid-column action-icon-column' (click)='onSelect(dataObject, $event)' tabindex='0' (keydown)='onKeydown($event)'\r\n        id='node-{{dataObject.Id}}-selected-action' data-column-type='selected-action'>\r\n        <span>\r\n          <img [src]='getImage(dataObject,2)' class='node-images' />\r\n        </span>\r\n      </td>\r\n      <td class='grid-column action-options' (click)='onSelect(dataObject, $event)' tabindex='0' (keydown)='onKeydown($event)' id='node-{{dataObject.Id}}-action-dropdown'\r\n        data-column-type='action-dropdown'>\r\n        <select class='action-dropdown' (change)='optionChange(dataObject.Id, $event.target.value)' [class.dropdown-disabled] = 'dataObject.DropdownDisabled ? true : false' [disabled]='dataObject.DropdownDisabled ? true : null'\r\n          id='node-{{dataObject.Id}}-select'>\r\n          <option *ngFor='let option of dataObject.AvailableActions; let index = index' [selected]='option == dataObject.MergeAction ? true : null'\r\n            id='node-{{dataObject.Id}}-option-{{index}}'>{{option}}</option>\r\n        </select>\r\n      </td>\r\n    </tr>\r\n  </table>\r\n</div>\r\n<app-codeeditor *ngIf='comparisonDataToDisplay.length > 0' [comparisonData]='selectedObject'></app-codeeditor>\r\n<div *ngIf='showContextMenu == true'>\r\n  <app-tree-control-context-menu [contextMenuPositionX]='treeControlContextMenuX' [contextMenuPositionY]='treeControlContextMenuY'\r\n    [selectedNodes]='selectedNodes' [selectedCell]='selectedCell'></app-tree-control-context-menu>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/grid/grid.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_grid_data_service__ = __webpack_require__("./src/app/service/grid-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_log_app_log_service__ = __webpack_require__("./src/app/app-log/app-log.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GridComponent = /** @class */ (function () {
    function GridComponent(gridService, appLog, zone) {
        var _this = this;
        this.gridService = gridService;
        this.appLog = appLog;
        this.zone = zone;
        this.comparisonDataToDisplay = [];
        this.selectedNodes = [];
        this.showContextMenu = false;
        this.treeControlContextMenuX = 0;
        this.treeControlContextMenuY = 0;
        this.isDataAvailable = false;
        window['angularComponentRef'] = {
            zone: this.zone,
            showTree: function (mergeActions) { return _this.getDataToDisplay(mergeActions); },
            getTree: function () { return _this.getGridData(); }
        };
    }
    GridComponent.prototype.ngOnInit = function () {
        this.getDataToDisplay(false);
    };
    /**
     * Focus on first row and bind click events to elements
     * @param checkData- complete data to match the count of rendered elements and actual nodes
     */
    GridComponent.prototype.bindElements = function (checkData) {
        if (!this.isDataAvailable) {
            var disabledDropdowns = void 0;
            var gridRow = document.querySelectorAll('.grid-data-row');
            var dataRowCount = gridRow.length;
            if (checkData && dataRowCount === checkData.length) {
                this.isDataAvailable = true;
                document.getElementById('comparison-grid');
                var firstDataCell = gridRow[0].firstElementChild;
                this.appLog.add('Focus on first cell', 'info');
                firstDataCell.focus();
                clearInterval(this.intervalId);
            }
        }
    };
    /**
     * Handle right click on grid
     * @param event - Event to get the position clicked
     */
    GridComponent.prototype.showTreeControlContextMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.clientX) {
            this.treeControlContextMenuX = event.clientX;
            this.treeControlContextMenuY = event.clientY;
        }
        else {
            var comparisonGrid = document.getElementById('comparison-grid');
            this.treeControlContextMenuX = Number((comparisonGrid.offsetHeight / 3).toFixed(2));
            this.treeControlContextMenuY = Number((comparisonGrid.offsetWidth / 3).toFixed(2));
        }
        this.showContextMenu = true;
        this.selectedCell = event.target.id;
    };
    /**
      * Handle selection for each row on comparison tree
      * @param objectSelected - Clicked node on comparison tree
      * @param event - Event to check if CTRL key was pressed
      */
    GridComponent.prototype.onSelect = function (objectSelected, event) {
        this.showContextMenu = false;
        this.appLog.add('Grid: Row selected', 'info');
        var rowId = 'node-' + objectSelected.Id;
        var controlKeyDown = event.ctrlKey;
        // Remove the transparent background color from existing cells
        var transparentCells = document.querySelectorAll('.transparent-cell');
        if (!controlKeyDown) {
            for (var iTransparentCellCounter = 0; iTransparentCellCounter < transparentCells.length; iTransparentCellCounter += 1) {
                transparentCells[iTransparentCellCounter].classList.remove('transparent-cell');
            }
        }
        // Get the greyed out cells in the selected row to make them transparent
        var greyedOutCells = document.querySelectorAll('#' + rowId + ' .greyed-out-cell');
        for (var iCellCounter = 0; iCellCounter < greyedOutCells.length; iCellCounter += 1) {
            greyedOutCells[iCellCounter].classList.add('transparent-cell');
        }
        // Remove selection from already selected rows
        var selectedRows = document.querySelectorAll('.selected-row');
        if (!controlKeyDown) {
            this.selectedNodes = [];
            for (var iRowCounter = 0; iRowCounter < selectedRows.length; iRowCounter += 1) {
                selectedRows[iRowCounter].classList.remove('selected-row');
            }
        }
        // Highlight the currently selected row
        if (this.selectedNodes.indexOf(objectSelected.Id) === -1) {
            document.getElementById(rowId).classList.add('selected-row');
            this.selectedNodes.push(objectSelected.Id);
            this.lastSelectedRow = document.getElementById(rowId);
        }
        else {
            document.getElementById(rowId).classList.remove('selected-row');
            this.selectedNodes.splice(this.selectedNodes.indexOf(objectSelected.Id), 1);
        }
        this.selectedObject = objectSelected;
    };
    /**
      * Handle key events on the grid
      * @param event - Check if the key pressed requires selection of rows
      */
    GridComponent.prototype.onKeydown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.showContextMenu = false;
        if (event.which === 93) {
            this.showTreeControlContextMenu(event);
            return false;
        }
        var siblingRow;
        var eventRow;
        var columnType;
        var nodeSelected;
        eventRow = event.target.parentElement;
        columnType = document.getElementById(event.target.id).getAttribute('data-column-type');
        // Remove the transparent background color from existing cells
        var transparentCells = document.querySelectorAll('.transparent-cell');
        for (var iTransparentCellCounter = 0; iTransparentCellCounter < transparentCells.length; iTransparentCellCounter += 1) {
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
                        var dropdownElement = void 0;
                        dropdownElement = document.getElementById(event.target.id).firstElementChild;
                        nodeSelected = this.comparisonDataToDisplay
                            .find(function (comparisonNode) { return comparisonNode.Id === parseInt(event.target.id.split('node-')[1], 10); });
                        var selectedOption = dropdownElement.selectedOptions[0];
                        var oldOption = selectedOption.innerHTML;
                        if (event.which === 38) {
                            siblingRow = this.getSiblingElement(true, selectedOption.id);
                        }
                        else {
                            siblingRow = this.getSiblingElement(false, selectedOption.id);
                        }
                        if (siblingRow) {
                            if (event.which === 38) {
                                dropdownElement.selectedIndex = dropdownElement.selectedIndex - 1;
                            }
                            else {
                                dropdownElement.selectedIndex = dropdownElement.selectedIndex + 1;
                            }
                            var option = dropdownElement.selectedOptions[0].innerHTML;
                            if (option !== oldOption) {
                                this.gridService.sendChange(nodeSelected.Id, option, oldOption);
                                this.getDataToDisplay(true);
                            }
                        }
                    }
                    else {
                        this.selectedNodes = [];
                        var selectedRows = document.querySelectorAll('.selected-row');
                        for (var iRowCounter = 0; iRowCounter < selectedRows.length; iRowCounter++) {
                            selectedRows[iRowCounter].classList.remove('selected-row');
                        }
                    }
                }
                // Select previous/next row (Up, Down, Shift+Up, Shift+Down)
                if (columnType !== 'action-dropdown') {
                    // Find the sibling based on the key pressed
                    if (event.which === 38) {
                        siblingRow = this.getSiblingElement(true, eventRow.id);
                    }
                    else {
                        siblingRow = this.getSiblingElement(false, eventRow.id);
                    }
                    if (!(siblingRow && siblingRow.classList.contains('grid-data-row'))) {
                        siblingRow = eventRow;
                    }
                    // Select the current row
                    var rowId_1 = siblingRow.id;
                    document.getElementById(rowId_1 + '-' + columnType).focus();
                    // Set this as current object so that editor can be refreshed
                    rowId_1 = rowId_1.split('node-')[1];
                    nodeSelected = this.comparisonDataToDisplay.find(function (comparisonNode) { return comparisonNode.Id === parseInt(rowId_1, 10); });
                    if (this.selectedNodes.indexOf(nodeSelected.Id) === -1) {
                        siblingRow.classList.add('selected-row');
                        this.selectedNodes.push(nodeSelected.Id);
                        this.lastSelectedRow = siblingRow;
                    }
                    else {
                        siblingRow.classList.remove('selected-row');
                        this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
                    }
                    this.selectedObject = nodeSelected;
                }
            }
            else {
                // This is for Ctrl+Shift+Up and Ctrl+Shift+Down
                if (event.shiftKey) {
                    var isSiblingAvailable = true;
                    var prev = true;
                    var rowId_2;
                    var comparisonTable = void 0;
                    var firstRow = void 0;
                    var lastRow = void 0;
                    // Decide if previous elements are to be fetched or next elements
                    if (event.which === 38) {
                        this.direction = 'up';
                        prev = true;
                    }
                    else {
                        this.direction = 'down';
                        prev = false;
                    }
                    // If last selected row exists, get its ID
                    if (this.lastSelectedRow) {
                        rowId_2 = this.lastSelectedRow.id;
                        nodeSelected = this.comparisonDataToDisplay
                            .find(function (comparisonNode) { return comparisonNode.Id === parseInt(rowId_2.split('node-')[1], 10); });
                    }
                    // if the direction changes and lastSelectedRow is not same as 
                    if (this.oldDirection && this.oldDirection !== this.direction
                        && this.lastSelectedRow && this.lastSelectedRow !== eventRow) {
                        if (this.selectedNodes.indexOf(nodeSelected.Id) > -1) {
                            this.lastSelectedRow.classList.remove('selected-row');
                            this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
                        }
                        else {
                            this.lastSelectedRow.classList.add('selected-row');
                            this.selectedNodes.push(nodeSelected.Id);
                        }
                    }
                    comparisonTable = document.getElementById('comparison-grid');
                    firstRow = this.getSiblingElement(false, comparisonTable.firstElementChild.firstElementChild.id);
                    lastRow = comparisonTable.firstElementChild.lastElementChild;
                    rowId_2 = eventRow.id;
                    nodeSelected = this.comparisonDataToDisplay
                        .find(function (comparisonNode) { return comparisonNode.Id === parseInt(rowId_2.split('node-')[1], 10); });
                    if (this.oldDirection && this.oldDirection !== this.direction
                        && (firstRow === eventRow || lastRow === eventRow)) {
                        if (this.selectedNodes.indexOf(nodeSelected.Id) > -1) {
                            eventRow.classList.remove('selected-row');
                            this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
                        }
                        else {
                            eventRow.classList.add('selected-row');
                            this.selectedNodes.push(nodeSelected.Id);
                        }
                    }
                    this.oldDirection = this.direction;
                    // Find all elements above or below this row and select them as well
                    while (isSiblingAvailable) {
                        siblingRow = this.getSiblingElement(prev, rowId_2);
                        if (siblingRow && siblingRow.classList && siblingRow.classList.contains('grid-data-row')) {
                            rowId_2 = siblingRow.id;
                            document.getElementById(rowId_2 + '-' + columnType).focus();
                            nodeSelected = this.comparisonDataToDisplay
                                .find(function (comparisonNode) { return comparisonNode.Id === parseInt(rowId_2.split('node-')[1], 10); });
                            this.selectedObject = nodeSelected;
                            if (this.selectedNodes.indexOf(nodeSelected.Id) === -1) {
                                siblingRow.classList.add('selected-row');
                                this.selectedNodes.push(nodeSelected.Id);
                            }
                            else {
                                siblingRow.classList.remove('selected-row');
                                this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
                            }
                            siblingRow.focus();
                            siblingRow = this.getSiblingElement(prev, rowId_2);
                        }
                        else {
                            isSiblingAvailable = false;
                        }
                    }
                }
            }
        }
        else if ((event.which === 37 || event.which === 39 || event.which === 9) && !event.ctrlKey && !event.shiftKey) {
            // To handle left and right keys
            var prev = true;
            var rowChild = void 0;
            if (event.which === 39 || event.which === 9) {
                prev = false;
            }
            siblingRow = this.getSiblingElement(prev, event.target.id);
            if (!siblingRow) {
                columnType = document.getElementById(event.target.id).getAttribute('data-column-type');
                eventRow.classList.remove('selected-row');
                nodeSelected = this.comparisonDataToDisplay
                    .find(function (comparisonNode) { return comparisonNode.Id === parseInt(eventRow.id.split('node-')[1], 10); });
                if (this.selectedNodes.indexOf(nodeSelected.Id) > -1) {
                    this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
                }
                siblingRow = this.getSiblingElement(prev, eventRow.id);
                nodeSelected = this.comparisonDataToDisplay
                    .find(function (comparisonNode) { return comparisonNode.Id === parseInt(siblingRow.id.split('node-')[1], 10); });
                this.selectedObject = nodeSelected;
                if (this.selectedNodes.indexOf(nodeSelected.Id) === -1) {
                    siblingRow.classList.add('selected-row');
                    this.selectedNodes.push(nodeSelected.Id);
                }
                else {
                    siblingRow.classList.remove('selected-row');
                    this.selectedNodes.splice(this.selectedNodes.indexOf(nodeSelected.Id), 1);
                }
                if (prev) {
                    rowChild = document.getElementById(siblingRow.id).lastElementChild;
                }
                else {
                    rowChild = document.getElementById(siblingRow.id).firstElementChild;
                }
                document.getElementById(rowChild.id).focus();
            }
            else {
                siblingRow.focus();
            }
        }
        // Get the greyed out cells in the selected row to make them transparent
        var greyedOutCells = document.querySelectorAll('.selected-row .greyed-out-cell');
        for (var iCellCounter = 0; iCellCounter < greyedOutCells.length; iCellCounter += 1) {
            greyedOutCells[iCellCounter].classList.add('transparent-cell');
        }
    };
    /**
     * Get the sibling for the elements
     * @param prev - True if previous sibling is to be fetched and false if next sibling is to be fetched
     * @param id - Id of the element for which sibling is to be fetched
     */
    GridComponent.prototype.getSiblingElement = function (prev, id) {
        if (prev) {
            return document.getElementById(id).previousElementSibling;
        }
        else {
            return document.getElementById(id).nextElementSibling;
        }
    };
    /**
     * Handle the change of option in drop-down
     * @param id - Id of the node changed
     * @param option - New selected options
     */
    GridComponent.prototype.optionChange = function (id, option) {
        var oldOption;
        oldOption = this.comparisonDataToDisplay.find(function (node) { return node.Id === id; }).MergeAction;
        this.gridService.sendChange(id, option, oldOption);
        this.getDataToDisplay(true);
    };
    /**
     * Return the image location as per the node type or the action selected
     * @param imageType - Node type or the Action selected
     * @param type - type based on if it is node icon or selected action
     */
    GridComponent.prototype.getImage = function (nodeData, type) {
        var roleImageLocation;
        if (type === 1) {
            roleImageLocation = './assets/node-type-' + nodeData.NodeType.replace(' ', '-') + '.png';
        }
        else if (type === 2) {
            if (nodeData.DropdownDisabled) {
                roleImageLocation = './assets/action-' + nodeData.MergeAction.replace(' ', '-') + '-Grey' + '.png';
            }
            else {
                roleImageLocation = './assets/action-' + nodeData.MergeAction.replace(' ', '-') + '.png';
            }
        }
        return roleImageLocation;
    };
    /**
     * Returns the style to be used to indent the row
     * @param nodeLevel - Level of the node
     */
    GridComponent.prototype.getIndentLevel = function (nodeLevel) {
        var indentValue = nodeLevel * 20 + 5;
        return indentValue + 'px';
    };
    /**
     * Get the data to be displayed from service
     */
    GridComponent.prototype.getDataToDisplay = function (mergeActions) {
        var _this = this;
        this.gridService.getGridDataToDisplay().subscribe(function (data) {
            if (mergeActions) {
                _this.changeOptions(data);
            }
            else {
                _this.isDataAvailable = false;
                _this.comparisonDataToDisplay = data;
                var checkData_1 = _this.comparisonDataToDisplay;
                if (_this.comparisonDataToDisplay.length > 0) {
                    _this.selectedObject = _this.comparisonDataToDisplay[0];
                    var that_1 = _this;
                    var methodToCall = function () {
                        that_1.bindElements(checkData_1);
                    };
                    _this.intervalId = setInterval(methodToCall, 1000);
                }
            }
            _this.showContextMenu = false;
        });
    };
    /**
     * Change the options by comparing the existing object with the one returned from C# application
     * @param changedData - Data returned from C# application
     */
    GridComponent.prototype.changeOptions = function (changedData) {
        var nodeId;
        var gridNode;
        for (var iRowCounter = 0; iRowCounter < changedData.length; iRowCounter += 1) {
            nodeId = changedData[iRowCounter].Id;
            gridNode = this.comparisonDataToDisplay.find(function (node) { return node.Id === nodeId; });
            gridNode.MergeAction = changedData[iRowCounter].MergeAction;
            gridNode.DropdownDisabled = changedData[iRowCounter].DropdownDisabled;
            gridNode.DisableMessage = changedData[iRowCounter].DisableMessage;
            gridNode.ShowNode = changedData[iRowCounter].ShowNode;
        }
    };
    /**
     * Get grid data to send to C# application
     */
    GridComponent.prototype.getGridData = function () {
        this.appLog.add('Grid: Sending data to C#', 'info');
        return JSON.stringify(this.comparisonDataToDisplay);
    };
    GridComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-grid',
            template: __webpack_require__("./src/app/grid/grid.component.html"),
            styles: [__webpack_require__("./src/app/grid/grid.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_grid_data_service__["a" /* GridDataService */], __WEBPACK_IMPORTED_MODULE_2__app_log_app_log_service__["a" /* AppLogService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]])
    ], GridComponent);
    return GridComponent;
}());



/***/ }),

/***/ "./src/app/service/grid-data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/fromPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__("./node_modules/rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_log_app_log_service__ = __webpack_require__("./src/app/app-log/app-log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__window_reference_service__ = __webpack_require__("./src/app/service/window-reference.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GridDataService = /** @class */ (function () {
    function GridDataService(logService, windowRef) {
        this.logService = logService;
        this.windowRef = windowRef;
        this._window = this.windowRef.nativeWindow;
    }
    /**
     * Get the data from the C# application
     */
    GridDataService.prototype.getGridDataToDisplay = function () {
        this.logService.add('Grid data service: Getting data from C#', 'info');
        return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__["a" /* fromPromise */])(this._window['comparisonJSInteraction']
            .getComparisonList())
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["a" /* map */])(function (data) { return JSON.parse(data); }));
    };
    /**
     * Send the change done to the C# application
     * @param id - Id of the node for which action was changed
     * @param newAction - The updated action
     * @param oldAction - The old action that was selected
     */
    GridDataService.prototype.sendChange = function (id, newAction, oldAction) {
        this.logService.add('Grid data service: Updating C# object on change in element', 'info');
        this._window['comparisonJSInteraction'].changeOccurred(id, newAction, oldAction);
    };
    /**
     * Send the selected action and status to C# application
     * @param action - Action to be performed
     * @param status - Status of nodes for which the action is to be performed
     * @param selectedNodes - List of node Ids which are selected
     */
    GridDataService.prototype.sendSelectedNodesAndAction = function (action, selectedNodes) {
        this.logService.add('Grid data service: Sending the selected nodes and the action to be performed to C#', 'info');
        this._window['comparisonJSInteraction'].performActionsOnSelectedActions(action, selectedNodes);
    };
    GridDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_log_app_log_service__["a" /* AppLogService */], __WEBPACK_IMPORTED_MODULE_4__window_reference_service__["a" /* WindowReferenceService */]])
    ], GridDataService);
    return GridDataService;
}());



/***/ }),

/***/ "./src/app/service/window-reference.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowReferenceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Return the instance of window
 */
function _window() {
    return window;
}
var WindowReferenceService = /** @class */ (function () {
    function WindowReferenceService() {
    }
    Object.defineProperty(WindowReferenceService.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowReferenceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])()
    ], WindowReferenceService);
    return WindowReferenceService;
}());



/***/ }),

/***/ "./src/app/shared/model/comparison-node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComparisonNode; });
var ComparisonNode = /** @class */ (function () {
    function ComparisonNode() {
    }
    return ComparisonNode;
}());



/***/ }),

/***/ "./src/app/tree-control-context-menu/tree-control-context-menu.component.css":
/***/ (function(module, exports) {

module.exports = ".tree-control-context-menu {\r\n    position: absolute;\r\n    height: 88px;\r\n    width:350px;\r\n    z-index: 30;\r\n    background-color: #F2F2F2;\r\n    -webkit-box-shadow: 2px 2px #D4D4D4;\r\n            box-shadow: 2px 2px #D4D4D4;\r\n}\r\n\r\n.action-list{\r\n  list-style-type:none;\r\n  -webkit-margin-after: 0;\r\n  -webkit-margin-before: 0;\r\n  -webkit-padding-start: 0;\r\n  margin-top: 2px;\r\n}\r\n\r\n.tree-control-context-menu-options{\r\n  font-family:'Segoe UI';\r\n  font-size:12px;\r\n  color: #000;\r\n  padding:2px 0 2px 40px;\r\n}\r\n\r\n.tree-control-context-menu-options:focus{\r\n  background-color: #91C9F7;\r\n  outline:none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/tree-control-context-menu/tree-control-context-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='tree-control-context-menu' [style.left.px] = 'contextMenuPositionX' [style.top.px] = 'contextMenuPositionY'>\r\n  <ul class='action-list'>\r\n    <li id='skip-selected'class='tree-control-context-menu-options' (click)='performAction(\"skip\")' tabindex='0' (keydown)='onKeydown($event)' on-mouseover = 'focusElement($event)' data-action='skip'>Skip selected objects</li>\r\n    <li id='create-selected' class='tree-control-context-menu-options' (click)='performAction(\"create\")' tabindex='0' (keydown)='onKeydown($event)' on-mouseover = 'focusElement($event)' data-action='create'>Create selected objects Missing in Target</li>\r\n    <li id='delete-selected' class='tree-control-context-menu-options' (click)='performAction(\"delete\")' tabindex='0' (keydown)='onKeydown($event)' on-mouseover = 'focusElement($event)' data-action='delete'>Delete selected objects Missing in Source</li>\r\n    <li id='update-selected' class='tree-control-context-menu-options' (click)='performAction(\"update\")' tabindex='0' (keydown)='onKeydown($event)' on-mouseover = 'focusElement($event)' data-action='update'>Update selected objects with Different Definitions</li>\r\n  </ul>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/tree-control-context-menu/tree-control-context-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeControlContextMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_grid_data_service__ = __webpack_require__("./src/app/service/grid-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_log_app_log_service__ = __webpack_require__("./src/app/app-log/app-log.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TreeControlContextMenuComponent = /** @class */ (function () {
    function TreeControlContextMenuComponent(gridService, appLog) {
        this.gridService = gridService;
        this.appLog = appLog;
        this.contextMenuPositionX = 0;
        this.contextMenuPositionY = 0;
        this.selectedNodes = [];
    }
    TreeControlContextMenuComponent.prototype.ngOnInit = function () {
        document.getElementById('skip-selected').focus();
    };
    /**
     * When the element is hovered, focus on the same element
     * @param event - Event to get the target
     */
    TreeControlContextMenuComponent.prototype.focusElement = function (event) {
        event.preventDefault();
        if (event.target.classList && event.target.classList.contains('tree-control-context-menu-options')) {
            document.getElementById(event.target.id).focus();
        }
    };
    /**
     * Perform action on selected nodes based on action and status selected
     * @param action - the action to be performed
     * @param status - the status of objects for which action is to be performed
     */
    TreeControlContextMenuComponent.prototype.performAction = function (action) {
        this.gridService.sendSelectedNodesAndAction(action, this.selectedNodes);
    };
    /**
     * Handle key events on context menu
     * @param event - Take appropriate actions if key events are on context menu
     */
    TreeControlContextMenuComponent.prototype.onKeydown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var siblingRow;
        if (event.which === 38 || event.which === 40) {
            if (event.which === 38) {
                siblingRow = this.getSiblingElement(true, event.target.id);
            }
            else {
                siblingRow = this.getSiblingElement(false, event.target.id);
            }
            if (!siblingRow) {
                if (event.which === 38) {
                    siblingRow = document.getElementById(event.target.id).parentElement.lastElementChild;
                }
                else {
                    siblingRow = document.getElementById(event.target.id).parentElement.firstElementChild;
                }
            }
            var allOptions = document.querySelectorAll('.tree-control-context-menu-options');
            var optionCounter = void 0;
            for (optionCounter = 0; optionCounter < allOptions.length; optionCounter += 1) {
                allOptions[optionCounter].classList.remove('hover');
            }
            siblingRow.focus();
        }
        else if (event.which === 13) {
            var action = document.getElementById(event.target.id).getAttribute('data-action');
            if (action) {
                this.performAction(action);
                document.getElementById(this.selectedCell).focus();
            }
        }
        else if (event.which === 27) {
            this.performAction('');
            document.getElementById(this.selectedCell).focus();
        }
    };
    /**
     * Get the sibling for the elements
     * @param prev - True if previous sibling is to be fetched and false if next sibling is to be fetched
     * @param id - Id of the element for which sibling is to be fetched
     */
    TreeControlContextMenuComponent.prototype.getSiblingElement = function (prev, id) {
        if (prev) {
            return document.getElementById(id).previousElementSibling;
        }
        else {
            return document.getElementById(id).nextElementSibling;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TreeControlContextMenuComponent.prototype, "contextMenuPositionX", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TreeControlContextMenuComponent.prototype, "contextMenuPositionY", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TreeControlContextMenuComponent.prototype, "selectedNodes", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TreeControlContextMenuComponent.prototype, "selectedCell", void 0);
    TreeControlContextMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-tree-control-context-menu',
            template: __webpack_require__("./src/app/tree-control-context-menu/tree-control-context-menu.component.html"),
            styles: [__webpack_require__("./src/app/tree-control-context-menu/tree-control-context-menu.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_grid_data_service__["a" /* GridDataService */], __WEBPACK_IMPORTED_MODULE_2__app_log_app_log_service__["a" /* AppLogService */]])
    ], TreeControlContextMenuComponent);
    return TreeControlContextMenuComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
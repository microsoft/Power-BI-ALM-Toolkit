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
        if (!__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production) {
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
                __WEBPACK_IMPORTED_MODULE_7__codeeditor_codeeditor_component__["a" /* CodeeditorComponent */]
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

module.exports = "#code-editor-container {\r\n    height: 100px;\r\n    /*display: none;*/\r\n}\r\n"

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
        var diffEditor = __WEBPACK_IMPORTED_MODULE_1_monaco_editor__["a" /* editor */].createDiffEditor(codeEditorContainer);
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

module.exports = "#comparison-table-container{\r\n    height: 650px;\r\n    overflow-y: auto;\r\n}\r\n\r\n.comparison-grid {\r\n    border: 1px solid rgba(112, 112, 112, 0.64);\r\n    margin: 10px;\r\n    border-collapse: collapse;\r\n  \r\n}\r\n\r\n.grid-column {\r\n    padding: 1px;\r\n    border: 1px solid rgba(112, 112, 112, 0.64);\r\n    max-width:300px;\r\n    text-overflow:ellipsis;\r\n    overflow: hidden;\r\n    white-space:nowrap;\r\n}\r\n\r\n.grid-row {\r\n    cursor: pointer;\r\n    font-weight: 600;\r\n    font-size: 12px;\r\n    font-family: 'Segoe UI';\r\n    font-color:#000;\r\n    height: 10px;\r\n}\r\n\r\n.hide-row {\r\n    display: none;\r\n}\r\n\r\n.greyed-out-cell {\r\n    background-color: rgba(112, 112, 112, 0.37);\r\n}\r\n\r\n.action-dropdown {\r\n    width: 75px;\r\n    font-size: 12px;\r\n    font-weight: 600;\r\n    font-family: 'Segoe UI';\r\n    font-color: #000;\r\n    position: relative;\r\n    top: 1px;\r\n    cursor: pointer;\r\n}\r\n\r\n.node-images {\r\n    height: 15px;\r\n    width: 15px;\r\n}\r\n\r\n.node-type {\r\n    position: relative;\r\n    top: -3px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/grid/grid.component.html":
/***/ (function(module, exports) {

module.exports = "<table class='comparison-grid'>\r\n    <tr id='header-row'>\r\n        <td class='grid-column'>Type</td>\r\n        <td class='grid-column'>Source Name</td>\r\n        <td class='grid-column'>Status</td>\r\n        <td class='grid-column'>Target Name</td>\r\n        <td class='grid-column'></td>\r\n        <td class='grid-column'>Action</td>\r\n\r\n    </tr>\r\n    <tr *ngFor='let dataObject of comparisonDataToDisplay' class='grid-row object-level-{{dataObject.Level}}' [class.hide-row]='!dataObject.ShowNode'>\r\n        <td class='grid-column' [style.padding-left]='getIndentLevel(dataObject.Level)' (click)='onSelect(dataObject)'>\r\n            <span>\r\n                <img [src]='getImage(dataObject.NodeType,1)' class='node-images' />\r\n            </span>\r\n            <span class='node-type'>{{dataObject.NodeType}}</span>\r\n        </td>\r\n        <td class='grid-column' (click)='onSelect(dataObject)' [class.greyed-out-cell]='!dataObject.SourceName'>{{dataObject.SourceName}}</td>\r\n        <td class='grid-column' (click)='onSelect(dataObject)'>{{dataObject.Status}}</td>\r\n        <td class='grid-column' (click)='onSelect(dataObject)' [class.greyed-out-cell]='!dataObject.TargetName'>{{dataObject.TargetName}}</td>\r\n        <td class='grid-column' (click)='onSelect(dataObject)'>\r\n            <span>\r\n                <img [src]='getImage(dataObject.MergeAction,2)' class='node-images' />\r\n            </span>\r\n        </td>\r\n        <td class='grid-column'>\r\n            <select class='action-dropdown' (change)='optionChange(dataObject.Id, $event.target.value)'>\r\n                <option *ngFor='let option of dataObject.AvailableActions' [selected]='option == dataObject.MergeAction ? true : null'>{{option}}</option>\r\n            </select>\r\n        </td>\r\n\r\n    </tr>\r\n</table>\r\n<app-codeeditor [comparisonData]=\"selectedObject\"></app-codeeditor>\r\n"

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
        window['angularComponentRef'] = {
            zone: this.zone,
            showTree: function () { return _this.getDataToDisplay(); },
            getTree: function () { return _this.getGridData(); }
        };
    }
    GridComponent.prototype.ngOnInit = function () {
        this.getDataToDisplay();
    };
    /**
      * Handle selection for each row on comparison tree
      * @param objectSelected - Clicked node on comparison tree
      */
    GridComponent.prototype.onSelect = function (objectSelected) {
        this.appLog.add('Grid: Row selected', 'info');
        this.selectedObject = objectSelected;
    };
    /**
     * Handle the change of option in drop-down
     * @param id - Id of the node changed
     * @param option - New selected options
     */
    GridComponent.prototype.optionChange = function (id, option) {
        var oldOption;
        oldOption = this.comparisonDataToDisplay.find(function (node) { return node.Id === id; }).MergeAction;
        this.comparisonDataToDisplay.find(function (node) { return node.Id === id; }).MergeAction = option;
        this.gridService.sendChange(id, option, oldOption);
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
            if (nodeData.Status.toLowerCase() === 'same definition') {
                roleImageLocation = './assets/action-Skip-Grey.png';
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
    GridComponent.prototype.getDataToDisplay = function () {
        var _this = this;
        this.appLog.add('Grid: Get users called', 'info');
        this.gridService.getGridDataToDisplay().subscribe(function (data) {
            _this.comparisonDataToDisplay = data;
        });
        // if the container already contains an editor, remove it
        var codeEditorContainer = document.getElementById('code-editor-container');
        if (codeEditorContainer.firstChild) {
            codeEditorContainer.removeChild(codeEditorContainer.firstChild);
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
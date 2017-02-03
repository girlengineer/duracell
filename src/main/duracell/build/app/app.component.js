"use strict";
/*
 * Angular 2 decorators and services
 */
var core_1 = require('@angular/core');
var services_1 = require('angular2-nexus-uiux/services');
/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(_appConfigService) {
        this._appConfigService = _appConfigService;
        this.name = 'Main App Component';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Initial App Component');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            styleUrls: ['app.component.css'],
            templateUrl: 'app.component.html'
        }), 
        __metadata('design:paramtypes', [Object])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var core_2 = require('@angular/core');
/*
 * Core and Environment providers/directives/pipes
 */
var angular2_nexus_uiux_1 = require('angular2-nexus-uiux');
var angular2_nexus_uiux_2 = require('angular2-nexus-uiux');
var services_1 = require('angular2-nexus-uiux/services');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
require('ddl/styles.global.css');
var citi_module_1 = require('ddl/citi.module');
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function (_super) {
    __extends(AppModule, _super);
    function AppModule(appRef, appStateService, appConfigService) {
        _super.call(this, appRef, appStateService);
        this.appRef = appRef;
        this.appStateService = appStateService;
        this.appConfigService = appConfigService;
        var appConfig;
        if ('production' === ENV) {
            appConfig = require('../../config/app-config.prod').config;
        }
        else if ('development' === ENV) {
            appConfig = require('../../config/app-config.dev').config;
        }
        else {
            appConfig = require('../../config/app-config.test').config;
        }
        appConfigService.setAppConfig(appConfig);
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                angular2_nexus_uiux_1.CoreServicesModule,
                citi_module_1.CitiModule
            ]
        }), 
        __metadata('design:paramtypes', [core_2.ApplicationRef, Object, Object])
    ], AppModule);
    return AppModule;
}(angular2_nexus_uiux_2.CoreAppModule));
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
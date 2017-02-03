"use strict";
var core_1 = require('@angular/core');
var angular2_nexus_uiux_1 = require('angular2-nexus-uiux');
var citi_module_1 = require('ddl/citi.module');
var index_component_1 = require('./index.component');
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                /*
                  ANGULAR2-NEXUS-STARTER NOTE:
                  Import the CoreCommonModule to have access to directives of Angular modules (like FormsModule, HttpModule, RouterModule, etc).
                */
                angular2_nexus_uiux_1.CoreCommonModule,
                citi_module_1.CitiModule
            ],
            declarations: [
                /*
                  ANGULAR2-NEXUS-STARTER NOTE:
                  Declare all the components of the sub app.
              */
                index_component_1.IndexComponent
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map
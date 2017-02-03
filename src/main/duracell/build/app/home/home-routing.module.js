"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var home_module_1 = require('./home.module');
var index_component_1 = require('./index.component');
/*
    ANGULAR2-NEXUS-STARTER NOTE:
    For Routing Modules related to modules with no sub modules follow the current example
*/
exports.HOME_ROUTES = [
    /*
        ANGULAR2-NEXUS-STARTER NOTE:
        Redirect to the first page for the module.
    */
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    /*
    ANGULAR2-NEXUS-STARTER NOTE:
        Specify the path and the component for every page.
    */
    {
        path: 'index',
        component: index_component_1.IndexComponent
    }
];
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(exports.HOME_ROUTES),
                home_module_1.HomeModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
exports.HomeRoutingModule = HomeRoutingModule;
//# sourceMappingURL=home-routing.module.js.map
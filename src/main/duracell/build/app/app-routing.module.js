"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var home_routing_module_1 = require('./home/home-routing.module');
var home_module_1 = require('./home/home.module');
/*
      ANGULAR2-NEXUS-STARTER NOTE:
      For Routing Modules export the routes into a constant. Then in the NgModule directive call RouterModule.forRoot or RouterModule.forChild with the constant.
      This separation allows to load the routing module in an eager way importing the routes (like home, see example below),
      or in a lazy way importing the routing module with System.import.
      RouterModule.forRoot only is used in the AppRoutingModule. For all the feature modules call RouterModule.forChild.

      IMPORTANT: As a best practice for better performance, for every Routing Module, load the default module using eager loading, and the rest of modules using lazy loading.
*/
exports.APP_ROUTES = [
    /*
        ANGULAR-NEXUS-STARTER NOTE:
        Redirect to the default landing module for the app. The default landing module must be a eager loaded module.
    */
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    /*
        ANGULAR2-NEXUS-STARTER NOTE:
        Use children option to specify routes for eager loaded modules.
    */
    {
        path: 'home',
        children: home_routing_module_1.HOME_ROUTES
    },
    {
        path: 'statements',
        loadChildren: function () { return System.import('statements/statements-routing.module').then(function (comp) {
            return comp.StatementsRoutingModule;
        }); }
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(exports.APP_ROUTES),
                /*
            
                  ANGULAR2-NEXUS-STARTER NOTE:
                  Import SubApp that are eager loaded like dahboard.
                  SubApp that are lazy loaded don't have to be imported.
                  If home needs to be lazy loaded, this import must be removed and System.import must be used in the routes definition.
                */
                home_module_1.HomeModule
            ],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map
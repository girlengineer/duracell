"use strict";
/*
 * Angular bootstraping
 */
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var hmr_1 = require('@angularclass/hmr');
var angular2_nexus_uiux_1 = require('angular2-nexus-uiux');
/*
 * App Module
 * our top level module that holds all of our components
 */
var app_1 = require('./app');
/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    var coreDecorateModuleRef = new angular2_nexus_uiux_1.CoreDecorateModuleRef(ENV);
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_1.AppModule)
        .then(coreDecorateModuleRef.getDecorateModuleRef())
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
// needed for hmr
// in prod this is replace for document ready
hmr_1.bootloader(main);
//# sourceMappingURL=main.browser.js.map
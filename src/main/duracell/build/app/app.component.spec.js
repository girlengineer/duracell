"use strict";
var testing_1 = require('@angular/core/testing');
// Load the implementations that should be tested
var app_component_1 = require('./app.component');
describe('App', function () {
    // provide our implementations or mocks to the dependency injector
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({
        providers: [
            app_component_1.AppComponent
        ] }); });
    it('should have a name', testing_1.inject([app_component_1.AppComponent], function (app) {
        expect(app.name).toEqual('Main App Component');
    }));
});
//# sourceMappingURL=app.component.spec.js.map
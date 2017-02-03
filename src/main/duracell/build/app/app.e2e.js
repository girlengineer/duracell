"use strict";
var protractor_1 = require('protractor');
describe('App', function () {
    beforeEach(function () {
        protractor_1.browser.get('/');
    });
    it('should have a title', function () {
        var subject = protractor_1.browser.getTitle();
        var result = 'STATEMENTS';
        expect(subject).toEqual(result);
    });
    it('should have header', function () {
        var subject = protractor_1.element(protractor_1.by.css('h1.title')).isPresent();
        var result = true;
        expect(subject).toEqual(result);
    });
});
//# sourceMappingURL=app.e2e.js.map
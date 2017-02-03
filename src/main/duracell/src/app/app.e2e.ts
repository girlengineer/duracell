import { browser, element, by } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'STATEMENTS';
    expect(subject).toEqual(result);
  });

  it('should have header', () => {
    let subject = element(by.css('h1.title')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

});

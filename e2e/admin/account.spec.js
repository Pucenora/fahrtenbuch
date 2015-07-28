'use strict';

describe('Trip Create View', function() {
  var page;

  beforeEach(function() {
    browser.get('/admin/account');
    page = require('./admin.po');
  });

  it('should fill the form correctly', function() {
    expect(page.h1El.getText()).toBe('Admin: Accounts');
    expect(page.listEl.count()).toEqual(3);

    // expect(page.listEl).toContain('Sparda');
    // expect(page.listElement.getText()).toBe('Sparda'); // Dresdner
    // element(by.cssContainingText('.pet', 'Dog'));
    // expect(page.test.getText()).toBe('Sparda'); // Dresdner

    // add
    page.inputEl.sendKeys('Test');
    page.buttonEl.click();

    // browser.get('/admin/account');
    // expect(page.listEl.count()).toEqual(4);

    // delete
    // browser.get('/admin/account');
    // page.deleteButtonEl.click();
  });
});

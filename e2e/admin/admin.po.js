'use strict';

var AdminPages = function() {
  this.h1El = element(by.css('h1'));
  this.inputEl = element(by.model('account.name'));
  this.buttonEl = element(by.css('.btn-primary'));
  this.listEl = element.all(by.repeater('account in accounts'));
  // this.listElement = element.all(by.repeater('account in accounts')).get(1); // .element(by.getText('Sparda'));
  // this.test = element.all(by.cssContainingText('list-group', 'Sparda'));
};

module.exports = new AdminPages();


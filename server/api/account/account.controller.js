/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /accounts              ->  index
 */

'use strict';

var _ = require('lodash');
var Account = require('./account.model');

// Get list of accounts
exports.index = function(req, res) {
  Account.find(function (err, accounts) {
    if(err) { return handleError(res, err); }
    return res.json(200, accounts);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
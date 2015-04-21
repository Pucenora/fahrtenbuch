/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /stays              ->  index
 */

'use strict';

var _ = require('lodash');
var Stay = require('./stay.model');

// Get list of stays
exports.index = function(req, res) {
  stay.find(function (err, stays) {
    if(err) { return handleError(res, err); }
    return res.json(200, stays);
  });
};

// Get a single stay
exports.show = function(req, res) {
  Stay.findById(req.params.id, function (err, stay) {
    if(err) { return handleError(res, err); }
    if(!stay) { return res.send(404); }
    return res.json(stay);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /cars              ->  index
 */

'use strict';

var _ = require('lodash');
var Car = require('./car.model');

// Get list of cars
exports.index = function(req, res) {
  Car.find(function (err, cars) {
    if(err) { return handleError(res, err); }
    return res.json(200, cars);
  });
};

// Get a single car
exports.show = function(req, res) {
  Car.findById(req.params.id, function (err, car) {
    if(err) { return handleError(res, err); }
    if(!car) { return res.send(404); }
    return res.json(car);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
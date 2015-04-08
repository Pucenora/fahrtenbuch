/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /trips              ->  index
 * POST    /trips              ->  create
 * GET     /trips/:id          ->  show
 * PUT     /trips/:id          ->  update
 * DELETE  /trips/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Trip = require('./trip.model');

// Get list of trips
exports.index = function(req, res) {
  Trip.find(function (err, trips) {
    if(err) { return handleError(res, err); }
    return res.json(200, trips);
  });
};

// Get a single trip
exports.show = function(req, res) {
  Trip.findById(req.params.id, function (err, trip) {
    if(err) { return handleError(res, err); }
    if(!trip) { return res.send(404); }
    return res.json(trip);
  });
};

// Creates a new trip in the DB.
exports.create = function(req, res) {
  Trip.create(req.body, function(err, trip) {
    if(err) { return handleError(res, err); }
    return res.json(201, trip);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
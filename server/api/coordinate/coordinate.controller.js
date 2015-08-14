/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /coordinates              ->  index
 * POST    /coordinates              ->  create
 * GET     /coordinates/:id          ->  show
 * PUT     /coordinates/:id          ->  update
 * DELETE  /coordinates/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Coordinate = require('./coordinate.model');

// Get list of coordinates
exports.index = function(req, res) {
  Coordinate.find(function (err, coordinate) {
    if(err) { return handleError(res, err); }
    return res.json(200, coordinate);
  });
};

// Get a single coordinate
exports.show = function(req, res) {
  coordinate.findById(req.params.id, function (err, coordinate) {
    if(err) { return handleError(res, err); }
    if(!coordinate) { return res.send(404); }
    return res.json(coordinate);
  });
};

// Creates a new coordinate in the DB.
exports.create = function(req, res) {
  Coordinate.create(req.body, function(err, coordinate) {
    if(err) { return handleError(res, err); }
    return res.json(201, coordinate);
  });
};

// Updates an existing coordinate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Coordinate.findById(req.params.id, function (err, coordinate) {
    if (err) { return handleError(res, err); }
    if(!coordinate) { return res.send(404); }
    var updated = _.merge(coordinate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, coordinate);
    });
  });
};

// Deletes a coordinate from the DB.
exports.destroy = function(req, res) {
  Coordinate.findById(req.params.id, function (err, coordinate) {
    if(err) { return handleError(res, err); }
    if(!coordinate) { return res.send(404); }
    coordinate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
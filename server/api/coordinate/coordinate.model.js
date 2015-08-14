'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CoordinateShema = new Schema({
	latitude: {type: Number, required: true},
	longitude: {type: Number, required: true},
});

module.exports = mongoose.model('Coordinate', CoordinateShema);

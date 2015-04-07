'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TripSchema = new Schema({
	driver: String,
	car: String,
	type: String,
	account: String,
	kilometer_start: Number,
	kilometer_end: Number,
	kilometer: Number,
	origin: String,
	origin_time: Date,
	destination: String,
	destination_time: Date,
});

TripSchema.plugin(autoIncrement.plugin, 'Trip');
module.exports = mongoose.model('Trip', TripSchema);
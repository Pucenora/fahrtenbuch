'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StayShema = new Schema({
	// destination: String,
	destination: {type: String, required: true},
	destinationLong: {type: Number, required: false},
	destinationLat: {type: Number, required: false},
	// destinationLong: Number,
	// destinationLat: Number,
	// client: String,
	// destinationTime: Date,
	client: {type: String, required: false},
	destinationTime: {type: Date, required: true}
});

module.exports = mongoose.model('Stay', StayShema);

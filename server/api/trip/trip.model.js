'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var TripSchema = new Schema({

	user: { type: ObjectId, ref: 'User' },
	account  : { type: ObjectId, ref: 'Account' },
	car: { type: ObjectId, ref: 'Car' },

	// enum
	type: String,
	
	origin: String,
	origin_time: Date,
	
	// stays: [Schema.Types.ObjectId],
	client: String,
	destination: String,
	destination_time: Date,

	kilometer_start: Number,
	kilometer_end: Number,
	kilometer: Number,

	// timestamp: Date,
});

module.exports = mongoose.model('Trip', TripSchema);
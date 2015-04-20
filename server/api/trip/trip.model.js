'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var TripSchema = new Schema({

	// driver: Schema.Types.ObjectId,
	// car: Schema.Types.ObjectId,
	// account: Schema.Types.ObjectId,
	// account: { type: Schema.Types.ObjectId },
	account  : { type: ObjectId, ref: 'Account' },
	car: { type: ObjectId, ref: 'Car' },

	driver: String,
	// car: String,
	// account: String,
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
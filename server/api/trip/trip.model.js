'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var TripSchema = new Schema({

	user: { type: ObjectId, ref: 'User', required: true },
	label: { type: String, required: true },
	timestamp: {type: Date, default: Date.now},
	route : [{ type : ObjectId, ref: 'Coordinate' }],

	kilometerStart: {type: Number, required: true},
	originTime: {type: Date, required: true},
	kilometerEnd: {type: Number, required: true},
	destinationTime: {type: Date, required: true},

	car: { type: ObjectId, ref: 'Car', required: true },
	type: { type: String, enum: ['corporate', 'noncorporate'], required: true },
	account: { type: ObjectId, ref: 'Account' },

	stays: [{ type : ObjectId, ref: 'Stay' }],
});

module.exports = mongoose.model('Trip', TripSchema);
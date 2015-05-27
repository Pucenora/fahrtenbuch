'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var TripSchema = new Schema({

	user: { type: ObjectId, ref: 'User', required: true },
	car: { type: ObjectId, ref: 'Car', required: true },
	type: { type: String, enum: ['corporate', 'noncorporate'], required: true },
	account: { type: ObjectId, ref: 'Account' },
	
	kilometerStart: {type: Number, required: true},
	kilometerEnd: {type: Number, required: true},

	originTime: {type: Date, required: true},
	destinationTime: {type: Date, required: true},
	stays: [{ type : ObjectId, ref: 'Stay' }],

	timestamp: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Trip', TripSchema);
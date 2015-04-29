'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CarSchema = new Schema({
	description: { type: String, required: true },
	license_tag: { type: String, required: true },
	mileage: { type: Number, required: true },
	base: { type: String, required: true },
});

module.exports = mongoose.model('Car', CarSchema);

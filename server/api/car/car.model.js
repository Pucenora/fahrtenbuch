'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CarSchema = new Schema({
	description: String,
	license_tag: String,
	mileage: Number,
});

module.exports = mongoose.model('Car', CarSchema);

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StayShema = new Schema({
	destination: String,
	client: String,
	destination_time: Date,
});

module.exports = mongoose.model('Stay', StayShema);

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StayShema = new Schema({
	destination: String,
	client: String,
	destinationTime: Date,
});

module.exports = mongoose.model('Stay', StayShema);

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AccountSchema = new Schema({
	name: { type: String, required: true },
});

module.exports = mongoose.model('Account', AccountSchema);

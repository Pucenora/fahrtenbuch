'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AccountSchema = new Schema({
	name: String,
});

module.exports = mongoose.model('Acccount', AccountSchema);

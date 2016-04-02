var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
autoIncrement.initialize(db);

exports.Post = require('./post');

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var StudentSchema = new mongoose.Schema({
	fullname: String,
	email: String,
	username: String,
	password: String,
	authkey: String
});


StudentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Student', StudentSchema);
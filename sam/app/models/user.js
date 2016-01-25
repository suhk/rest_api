const mongoose = require('mongoose');

const userSchema = mongoose.schema({
	username, String,
	firstName: String,
	lastName, String,
	age: String,
	password: String
});

module.exports = exports = mongoose.model('user', userSchema);
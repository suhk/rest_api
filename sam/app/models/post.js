const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: String,
	date: {type: string, default: new Date()},
	body: String,
	tags, Array
});

module.exports = mongoose.model('post', postSchema);
const User = require(__dirname + '/../models/user');
const Post = require(__dirname + '/../models/post');
const express = require('express');
const mongoose = require('mongoose');

// const handleDbError = require(__dirname + '/../../lib/db/handleDbError');

var userRoutes = module.exports = exports = express.Router();

userRoutes.get('/:userId/posts', function(req, res, next) {
	Post.find({owner_id: req.param.userId}, userPosts, (err, data) => {
		if(err) return console.log(err);

		res.status(200).json(data);
		
	});
});

userRoutes.get('/', function(req, res, next) {
	User.find({}, users, (err, data) => {
		if(err) return console.log(err);

		res.status(200).json(data);
	})
})
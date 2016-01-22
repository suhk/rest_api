const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const moviesRouter = require(__dirname + '/routes/movies_routes');
mongoose.connect(process.env.MONGOLAB_URI||'mongodb://localhost/movies_app_dev');

app.use('/api',moviesRouter);

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server up on port: ' + PORT));

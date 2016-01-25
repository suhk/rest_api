var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/person_app_dev');

var personRouter = require(__dirname + '/routes/person_routes');

app.use('/api', personRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up'));

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = module.exports = exports = express();

mongoose.connect(process.env.MONGOLAB_URI ||
  'mongodb://localhost/kittens_app_dev');

const kittenRouter = require(__dirname + '/routes/kitten_router');
const internetzRouter = require(__dirname + '/routes/internetz_router');

app.use('/api', kittenRouter);
app.use('/api', internetzRouter);

app.server = app.listen(3000, () => console.log('listening on port: ' + 3000));

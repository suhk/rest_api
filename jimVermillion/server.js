'use strict';

const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/flower_app');

const flowerRouter = require(__dirname + '/routes/flowerRouter');
const gardenerRouter = require(__dirname + '/routes/gardenerRouter');
const nonCrudRouter = require(__dirname + '/routes/nonCrudRouter');

app.use('/api', flowerRouter);
app.use('/api', gardenerRouter);
app.use('/nonCrud', nonCrudRouter);

module.exports.server = app.listen(3000, () => console.log('server up on port: ' + 3000));
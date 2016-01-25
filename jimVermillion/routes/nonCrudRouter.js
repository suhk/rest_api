'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Flower = require(__dirname + '/../models/flower');
const Gardener = require(__dirname + '/../models/gardener');
const handleError = require(__dirname + '/../lib/errorHandler');

var nonCrudRouter = module.exports = exports = express.Router();

nonCrudRouter.get('/howManyFlowers', (req, res) => {
  var gardeners = 0;
  var flowers = 0;
  Gardener.count({}, (err, data) => {
    if (err) return handleError(err, res);
    gardeners = data;
  });
  Flower.count({}, (err, data) => {
    if (err) return handleError(err, res);
    flowers = data;
    res.send('With the gardeners on hand we can potentially grow ' + (gardeners * flowers) + ' flowers.');
  });
});
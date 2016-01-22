'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Gardener = require(__dirname + '/../models/gardener');
const handleError = require(__dirname + '/../lib/errorHandler');

var gardenerRouter = module.exports = exports = express.Router();

gardenerRouter.get('/gardeners', (req, res) => {
  Gardener.find({}, (err, data) => {
    if (err) return handleError(err, res);
    res.status(200).json(data);
  });
});

gardenerRouter.post('/gardeners', jsonParser, (req, res) => {
  var newGardener = new Gardener(req.body);
  newGardener.save((err, data) => {
    if (err) return handleError(err, res);
    res.status(200).json(data);
  });
});

gardenerRouter.delete('/gardeners/:id', (req, res) => {
  Gardener.remove({_id: req.params.id}, (err) => {
    if (err) return handleError(err, res);
    res.status(200).json({msg: 'success'});
  });
});

gardenerRouter.put('/gardeners/:id', jsonParser, (req, res) => {
  var updateGardenerData = req.body;
  delete updateGardenerData._id;
  Gardener.update({_id: req.params.id}, updateGardenerData, err => {
    if (err) return handleError(err, res);
    res.status(200).json(updateGardenerData);
  });
});

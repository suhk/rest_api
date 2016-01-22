'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Flower = require(__dirname + '/../models/flower');
const handleError = require(__dirname + '/../lib/errorHandler');

var flowerRouter = module.exports = exports = express.Router();

flowerRouter.get('/flowers', (req, res) => {
  Flower.find({}, (err, data) => {
    if (err) return handleError(err, res);
    res.status(200).json(data);
  });
});

flowerRouter.post('/flowers', jsonParser, (req, res) => {
  var newFlower = new Flower(req.body);
  newFlower.save((err, data) => {
    if (err) return handleError(err, res);
    res.status(200).json(data);
  });
});

flowerRouter.delete('/flowers/:id', (req, res) => {
  Flower.remove({_id: req.params.id}, (err) => {
    if (err) return handleError(err, res);
    res.status(200).json({msg: 'success'});
  });
});

flowerRouter.put('/flowers/:id', jsonParser, (req, res) => {
  var updateFlowerData = req.body;
  delete updateFlowerData._id;
  Flower.update({_id: req.params.id}, updateFlowerData, (err) => {
    if (err) return handleError(err, res);
    res.status(200).json(updateFlowerData);
  });
});

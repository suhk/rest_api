'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Internetz = require(__dirname + '/../models/internetz');
const handleDBError = require(__dirname + '/../lib/handleDBError');

const internetzRouter = module.exports = exports = express.Router();

internetzRouter.get('/internetz', (req, res) => {
  Internetz.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

internetzRouter.post('/internetz', bodyParser.json(), (req, res) => {
  const newInternetz = new Internetz(req.body);
  newInternetz.save((err, data) => {
    if (err) return handleDBError(err);

    res.status(200).json(data);
  });
});

internetzRouter.put('/internetz/:id', bodyParser.json(), (req, res) => {
  const kittenData = req.body;
  delete kittenData._id;

  Internetz.update({ _id: req.params.id }, kittenData, err => {
    if (err) return handleDBError(err);

    res.status(200).json({ msg: 'success' });
  });
});

internetzRouter.delete('/internetz/:id', (req, res) => {
  Internetz.remove({ _id: req.params.id }, err => {
    if (err) return handleDBError(err);

    res.status(200).json({ msg: 'success' });
  });
});

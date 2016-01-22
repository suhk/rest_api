const express = require('express');
const jsonParser = require('body-parser').json();
const Request = require(__dirname + '/../models/request');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const handleUnavailError = require(__dirname + '/../lib/handle_unavailable');

var requestsRouter = module.exports = exports = express.Router();

requestsRouter.get('/requestsAll', (req, res) => {
  Request.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

requestsRouter.get('/requestsUnclaimed', (req, res) => {
  Request.find({claimedBy: {$in: ['null']}}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

requestsRouter.post('/requests', jsonParser, (req, res) => {
  var newRequest = new Request(req.body);
  newRequest.save((err, data) => {
    if (err) return handleUnavailError(err, res);
    res.status(200).json(data);
  });
});

requestsRouter.put('/requests/:id', jsonParser, (req, res) => {
  var requestData = req.body;
  delete requestData._id;
  Request.update({_id: req.params.id}, requestData, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully updated request'});
  });
});

requestsRouter.delete('/requests/:id', (req, res) => {
  Request.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successfully deleted request'});
  });
});

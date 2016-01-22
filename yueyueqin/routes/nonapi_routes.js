const express = require('express');
const handleError = require(__dirname + '/../lib/handle_error');

var nonapiRouter = module.exports = exports = express.Router();

nonapiRouter.get('/:name', function(req,res){
  res.status(200).json({msg:req.params.name});
});

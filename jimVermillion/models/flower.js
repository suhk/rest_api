'use strict';

const mongoose = require('mongoose');

var flowerSchema = new mongoose.Schema({
  name: String,
  color: String,
  difficulty_to_grow: {type: String, default: 'easy'}
});

module.exports = exports = mongoose.model('Flower', flowerSchema);
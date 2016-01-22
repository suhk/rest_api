const mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  organisation: {type: String, default: 'Amazon'}
});

module.exports = exports = mongoose.model('Donor', donorSchema);

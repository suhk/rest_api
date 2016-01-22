const mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  giftCard: {type: String, default: 'QFC'},
  claimedBy: {type: String, default: 'null'}
});

module.exports = exports = mongoose.model('Request', requestSchema);

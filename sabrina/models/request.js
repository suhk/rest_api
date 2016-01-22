const mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  giftCard: {type: String, default: 'QFC'},
  claimedBy: {type: String, default: 'null'}
});

var Request = mongoose.model('Request', requestSchema);

Request.schema.path('giftCard').validate(function(value) {
  return /QFC|Amazon|Petco|Best Buy/i.test(value);
}, 'Unavailable gift card');

module.exports = exports = mongoose.model('Request', requestSchema);

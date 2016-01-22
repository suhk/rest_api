const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
  name: {type:String,default: 'no name'},
  type: {type:String,default:'no type'},
  actors: {type:String,default: 'no actors'},
  publish: Date
});

module.exports = exports = mongoose.model('Movie',movieSchema);

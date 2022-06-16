const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema(
  {
    position: Number,
    foreign: String,
    english: String,
    code: String,
  },
  {collection: 'dictionaries'},
);

module.exports = mongoose.model('dictionary', dictionarySchema);

const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema(
  {
    code: {type: String},
  },
  {collection: 'languages'},
);

module.exports = mongoose.model('language', languageSchema);

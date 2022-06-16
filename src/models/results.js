const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    userName: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    language: {type: String},
    words: [
      {
        score: Number,
        dictionary: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'dictionaries',
        },
      },
    ],
  },
  {collection: 'results'},
);

module.exports = mongoose.model('result', resultSchema);

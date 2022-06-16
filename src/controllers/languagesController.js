const Language = require('../models/language');
const Dictionary = require('../models/dictionary');

exports.getLanguages = (req, res) => {
  Language.find({}, (err, data) => {
    res.render('languages', {data});
  });
};

exports.getList = async (req, res) => {
  res.render('pagination', {country: req.params.id});
};

exports.getDictionariesPagination = async (req, res) => {
  const limit = 50;
  console.log(req.params.page);
  Dictionary.find({code: req.params.id}, (err, data) => {
    res.render('words', {words: data});
  })
    .sort({position: 1})
    .skip((req.params.page - 1) * limit)
    .limit(limit);
};

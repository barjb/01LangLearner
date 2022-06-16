const Dictionary = require('../models/dictionary');

exports.getDictionaryByCode = async (req, res) => {
  Dictionary.find({code: req.params.id}, (err, data) => {
    if (err) res.json({status: 500, message: err});
    res.render('words', {words: data});
  }).sort({position: 1});
};

exports.getDictionariesPagination = async (req, res) => {
  const limit = 50;
  console.log(req.params.page);
  Dictionary.find({code: req.params.id}, (err, data) => {
    if (err) res.json({status: 500, message: err});
    res.render('words', {words: data});
  })
    .sort({position: 1})
    .skip((req.params.page - 1) * limit)
    .limit(limit);
};

exports.getDictionariesForTestPagination = async (req, res) => {
  const limit = 50;
  console.log(req.params.page);
  Dictionary.find({code: req.params.id}, (err, data) => {
    if (err) res.json({status: 500, message: err});
    res.render('words', {words: data});
  })
    .sort({position: 1})
    .skip((req.params.page - 1) * limit)
    .limit(limit)
    .projection({english: 0});
};

var express = require('express');
var Contracts = require('../models/contracts');

var router = express.Router();

router.get('/', (req, res, next) => {
  Contracts.getContracts((err, contracts) => {
    if (err)
      return res.json(err);
    return res.json(contracts);
  });
});

router.post('/', (req, res) => {
  var city = req.body.city;

  Cities.insert(city, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');

router.get('/', function (req, res, next) {
  if (req.query['is-featured'] === 'true') {
    Survey.query({where: {is_featured: true}}).fetchAll().then(function (surveys) {
      res.json(surveys);
    });
  } else if (req.query['all-surveys'] === 'true') {
    Survey.fetchAll().then(function (surveys) {
      res.json(surveys);
    });
  } else {
    Survey.query({where: {is_listed: true}}).fetchAll().then(function (surveys) {
      res.json(surveys);
    });
  }
});

router.get('/:id', function (req, res, next) {
  var key = isNaN(req.params.id) ? 'name' : 'id';
  var query = {};
  query[key] = req.params.id;

  return new Survey(query)
  .fetch().then(function (response){
    res.json(response.attributes);
  })
})

module.exports = router;

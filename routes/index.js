var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    "sort" : "popular"
  });
});

/* GET index item list page. */
router.get('/items', function(req, res, next) {
  var db = req.db;
  var collection = db.get('masterTest');

  /*var sort = req.params.sort;
  if (sort == "popularity") {
    var sortquery = { name : 1 };
  }

  var cursor = collection.find({}).sort(sortquery);*/

  collection.find({},{ sort: { popularity: -1 }},function(e,docs){
    res.json(docs); //returns the json of items
  });
});

/* GET market page. */
router.get('/market', function(req, res, next) {
  res.render('market');
});

module.exports = router;

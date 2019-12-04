var express = require('express');
var router = express.Router();
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.json({'Message':'Hello world!'})
  res.render('index', {title: 'Hi'})
  //res.send(path)
});

module.exports = router;

var express = require('express');
var router = express.Router();
const config = require('../config')
const userController = require('../')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res) {
  res.send('create a user')
})

router.post('/login', (req, res) => {
  res.json({username:req.body.username, password: req.body.password, key:config.tokenKey})
})

router.post('/create', )

module.exports = router;

var express = require('express');
var router = express.Router();
const config = require('../config')
const userController = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
  res.json({username:req.body.username, password: req.body.password, key:config.tokenKey})
})

router.post('/create', userController.create)

module.exports = router;

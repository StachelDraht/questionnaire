var express = require('express');
var router = express.Router();
const config = require('../config')
const userController = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.create)
router.post('/login', userController.login)
router.get('/me', userController.auth, userController.me)
router.post('/me/logout', userController.auth, userController.logout)
router.post('/me/logoutall', userController.auth, userController.logoutAll)

module.exports = router;

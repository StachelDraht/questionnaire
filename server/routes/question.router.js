const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question.contoller')

router.get('/test', questionController.test)
router.get('/', questionController.main)
router.get('/create', questionController.createQuestion)

module.exports = router
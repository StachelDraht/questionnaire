const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answer.controller')

router.post('/makeanswer', answerController.makeAnswer)
router.get('/', answerController.main)

module.exports = router
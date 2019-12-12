var express = require('express');
var router = express.Router();
const questionnaireController = require('../controllers/questionnaire.controller')

/* GET home page. */
router.get('/', questionnaireController.main);
router.get('/test', questionnaireController.test)
router.post('/create', questionnaireController.create)
router.get('/:id', questionnaireController.getQuestionnaire)

module.exports = router;

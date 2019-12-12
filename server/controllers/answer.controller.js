const Answer = require('../models/answer.model')
const Questionnaire = require('../models/questionnaire.model')
const Question = require('../models/question.model')

exports.makeAnswer = function(req, res) {
    let newAnswer = new Answer({
        questionId: req.body.questionId,
        rate: req.body.rate
    })
    newAnswer.save(err => {
        if(err) {
            res.send(err)
            return
        }
        res.send('Done')
    })
}
exports.main = function(req, res) {
    res.send('Answer page')
}

exports.makeAnswers = async function(req, res) {
    let questionnaire = await Questionnaire.findById(req.body.questionId)
        .then(data => {
            console.log(data)
        })
    //let expectAnswers = await Question.questionsCount(req.body.questionnaireId)
    res.status(200).send('ok')
}

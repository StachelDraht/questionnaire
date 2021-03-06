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
        }
        res.send('Done')
    })
}
exports.main = function(req, res) {
    res.send('Answer page')
}

exports.makeAnswers = async function(req, res) {
    await Questionnaire.findOne(req.body.questionId)
        .then(data => {
            Question.countDocuments({questionnaire: data.uniqueName})
                .then(expectedAnswers => {
                    if(expectedAnswers == Object.keys(req.body.answers).length) {
                        Object.entries(req.body.answers).forEach((entry) => {
                            const [key, val] = entry
                            new Answer({
                                questionId: key,
                                answerText: val
                            }).save(err => {
                                if(err) {
                                    res.json({error: err})
                                }
                            })
                        })
                        res.status(200).json({status:'success', message: 'Thank you!'})
                    } else {
                        res.status(200).json({status: 'warning', message: 'Not enought answers'})
                    }
                })
                .catch(e => {
                    throw new Error({error: e})
                })
        }).catch(e => {
            console.log(e)
        })
}

exports.checkToken = async function(req, res, next) {
    console.log('Checktoken')
    console.log(req.connection.remoteAddress)
    next()
}

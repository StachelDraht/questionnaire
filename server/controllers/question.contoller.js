const Question = require('../models/question.model')

exports.main = function(req, res) {
    res.send('main')
}
exports.test = function(req, res) {
    res.send('Hello from question controller')
}
exports.createQuestion = function(req, res) {
    let newQuestion = new Question({
        question: 'Hello',
        order: '4',
        questionnaire: 'eic2019q4'
    })
    newQuestion.save(err => {
        if(err) {
            res.json({'Error':err.errmsg})
        } else {
            res.send('New quesiton added succefully')
        }
    })
}
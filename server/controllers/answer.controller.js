const Answer = require('../models/answer.model')

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
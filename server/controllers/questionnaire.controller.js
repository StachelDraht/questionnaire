const Questionnaire = require('../models/questionnaire.model')
const Question = require('../models/question.model')

exports.test = function(req, res) {
    res.json({'Message':'questionnaire controller test'})
}
exports.main = function(req, res) {
    res.json({'Message': 'Main page'})
}
exports.create = function(req, res) {
    let newQuestionnaire = new Questionnaire(
        {
            name: req.body.name,
            uniqueName: req.body.uniqueName
        }
    )
    newQuestionnaire.save(err => {
        if(err) {
            res.json({'Error':err.errmsg})
        } else {
            res.send('New questionnaire created succefully')
        }
    })
}
exports.getQuestionnaire = function(req, res) {
    let questionnaire
    Questionnaire.findById(req.params.id, function(err, data) {
        if(err) {
            res.json({'Error':err})
            return
        }
        questionnaire = data
        Question.find({questionnaire:data.uniqueName},null,{sort: {order: 'ascending'}}, function(err, docs){
            if(err){
                return next(err)
            }
            res.json({'questionnaire':questionnaire, 'questions':docs})
        })
    })
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
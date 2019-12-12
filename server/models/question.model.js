const mongoose = require('mongoose')
const Schmena = mongoose.Schema

let QuestionSchema = new Schmena({
    question: {type: String, require: true},
    order: {type: Number, require: true},
    questionnaire: {type: String, require: true},
    type: {type: String, require: true}
})

QuestionSchema.statics.questionsCount = async function(questionnaireId) {
    Question.countDocuments({questionnaire: questionnaireId}, function(error, count) {
        if(error) {
            throw new Error({error: error})
        }
        return count
    })
}

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question
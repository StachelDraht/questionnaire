const mongoose = require('mongoose')
const Schmena = mongoose.Schema

let QuestionSchema = new Schmena({
    question: {type: String, require: true},
    order: {type: Number, require: true},
    questionnaire: {type: String, require: true},
    type: {type: String, require: true}
})

module.exports = mongoose.model('Question', QuestionSchema)
const mongoose  = require('mongoose')
const Schema = mongoose.Schema

let AnswerSchema = new Schema({
    questionId: {type:String, require: true},
    rate: {type: Number, require: false},
    answerText: {type: String, required: false},
    date: {type: Date, default: Date.now()}
})

const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer
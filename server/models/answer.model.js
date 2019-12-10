const mongoose  = require('mongoose')
const Schema = mongoose.Schema

let AnswerSchema = new Schema({
    questionId: {type:String, require: true},
    rate: {type: Number, require: true},
    answerText: {type: String, required: false},
    date: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Answer', AnswerSchema)
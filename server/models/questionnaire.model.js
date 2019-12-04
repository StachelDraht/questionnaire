const mongoose = require('mongoose')
const Schema = mongoose.Schema

let QuestionnaireSchema = new Schema({
    name: {type: String, required: true},
    uniqueName: {type:String, required: true, unique: true}
})

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema)
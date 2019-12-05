const mongoos = require('mongoose')
const Schema = mongoos.Schema

let UserSchema = new Schema({
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
})

module.exports = mongoos.model('User', UserSchema)
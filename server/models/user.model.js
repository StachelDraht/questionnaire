const mongoos = require('mongoose')
const Schema = mongoos.Schema
const bcrypt = require('bcryptjs')

let UserSchema = new Schema({
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
})

UserSchema.pre('save', function(next) {
    var user = this
    if(!user.isModified('password')) {return next()}
    bcrypt.hash(user.password,10).then(hashedpassword => {
        user.password = hashedpassword
        next()
    })
}, function(err) {
    next(err)
})

module.exports = mongoos.model('User', UserSchema)
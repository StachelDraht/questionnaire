const mongoos = require('mongoose')
const Schema = mongoos.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

let UserSchema = new Schema({
    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
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

UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, config.tokenKey)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

module.exports = mongoos.model('User', UserSchema)
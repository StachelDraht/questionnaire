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

UserSchema.statics.findByCredentials = async (username, password) => {
    const user = User.findOne({username})
    if(!user) {
        throw new Error({error: 'Invalid login credentials'})
    }
    /*const isPasswordPatch = await bcrypt.compare(password, user.password)
    if(!isPasswordPatch) {
        throw new Error({error: 'Wrong pass'})
    }*/
    return user
}

const User = mongoos.model('User', UserSchema)
module.exports = User
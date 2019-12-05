const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

exports.login = function(req, res) {
    res.json()
}

exports.create = function(req, res) {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save(err => {
        if(err) {
            res.json({err:err})
            return
        }
        const token = newUser.generateAuthToken()
        res.send(newUser)
    })
}

exports.login = async function(req, res) {
    const {username, password} = req.body
    const user = await User.findByCredentials(username, password)
    if(!user) {
        return res.status(400).json({error: 'Login failed'})
    }
    const token = await User.generateAuthToken()
    red.json({user: user, token: token})
}
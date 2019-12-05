const User = require('../models/user.model')

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
        res.send('User created')
    })
}
const User = require('../models/user.model')

exports.login = function(req, res) {
    res.json()
}

exports.create = async function(req, res) {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(er)
    }
}

exports.login = async function(req, res) {
    const {username, password} = req.body
    const user = await User.findByCredentials(username, password)
    if(!user) {
        return res.status(400).json({error: 'Login failed'})
    }
    const token = await user.generateAuthToken()
    res.json({user: user, token: token})
}
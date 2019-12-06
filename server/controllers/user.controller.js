const User = require('../models/user.model')
const config = require('../config')
const jwt = require('jsonwebtoken')

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
    res.send({user: user, token: token})
}

exports.auth = async function(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer','')
        const data = jwt.verify(token, config.tokenKey)
        const user = await User.findOne({_id: data._id, 'tokens.token': token})
        if(!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({error: 'Not authrized'})
    }
}
 
exports.me = async function(req, res) {
    res.send(req.user)
}

exports.logout = async function(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send(error)
    }
}

exports.logoutAll = async function(req, res) {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send(error)
    }
}
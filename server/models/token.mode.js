const mongoos = require('mongoose')
const Schema = mongoos.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

let TokenSchema = new Schema({
    
})

const Token = mongoos.model('Token', TokenSchema)
module.exports = Token
'use stric'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeSchema = Schema({
    name: String,
    displayName: String
})

module.exports = mongoose.model('Type', TypeSchema)

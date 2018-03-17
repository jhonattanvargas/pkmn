'use stric'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TypeSchema = require(global.PATH_MODELS+'type')

const PokemonSchema = Schema({
    name: String,
    nickName: String,
    sex: {type: String, enum: ['male','female','undefined']},
    type: [],
    weakness: [],
    strength: [],
    level: Number,
    healthPoint: Number,
    moves: [],
    idUser: String
})

module.exports = mongoose.model('Pokemon', PokemonSchema)

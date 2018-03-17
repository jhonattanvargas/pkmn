'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonalMoveSchema = Schema({
    move: MoveSchema,
    difficulty: Number,
    damage: Number,
    tried: Number,
    point: Number,
    observation: String,
    repetition: Boolean,
    critical: Boolean,
    timeEffect : Number
})

module.exports = mongoose.model('PersonalMove', PersonalMoveSchema)

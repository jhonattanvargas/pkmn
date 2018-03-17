'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoveSchema = Schema({
    name: String,
    type: {type: String, enum: ['ATK','PP','MOV']},
    learnedType: [],
    levelMin: Number,
    levelMax: Number,
    difficulty: Number,
    damage: Number,
    description: String,
    position: Number,
    speed: Number,
    distraction: Number,
    repetition: Boolean,
    tried: Number,
    point: Number,
    contact: Boolean,
    aoe: Boolean,
    bodily: Boolean,
    critical: Boolean,
    timeEffect: Number
})

module.exports = mongoose.model('Move', MoveSchema)

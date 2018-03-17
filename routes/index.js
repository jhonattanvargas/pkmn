'use strict'

const express = require('express')
const api = express.Router()
const auth = require(global.PATH_MIDDLEWARES+'auth')

const TypeCtrl = require(global.PATH_CONTROLLERS+'type')
const UserCtrl = require(global.PATH_CONTROLLERS+'user')
const PokemonCtrl = require(global.PATH_CONTROLLERS+'pokemon/pokemon')
const WeaknessCtrl = require(global.PATH_CONTROLLERS+'pokemon/weakness')
const StrengthCtrl = require(global.PATH_CONTROLLERS+'pokemon/strength')
const MoveCtrl = require(global.PATH_CONTROLLERS+'move/move')
const LearnedTypeCtrl = require(global.PATH_CONTROLLERS+'move/learnedType')

api.post('/signup', UserCtrl.signUp)
api.post('/signin',UserCtrl.signIn)

api.get('/type/:id', TypeCtrl.getType)
api.get('/type', TypeCtrl.getTypes)
api.post('/type', TypeCtrl.saveType)
api.put('/type/:id', auth, TypeCtrl.updateType)
api.delete('/type/:id', auth, TypeCtrl.deleteType)

api.get('/pokemon/:id', PokemonCtrl.getPokemon)
api.get('/pokemon', PokemonCtrl.getPokemons)
api.post('/pokemon', auth, PokemonCtrl.savePokemon)
api.put('/pokemon/:id', auth, PokemonCtrl.updatePokemon)
api.delete('/pokemon/:id', auth, PokemonCtrl.deletePokemon)

api.get('/pokemon/:idUser/weakness/:idType', WeaknessCtrl.getWeakness)
api.get('/pokemon/:idUser/weakness', WeaknessCtrl.getWeaknesses)
api.post('/pokemon/:idUser/weakness', auth, WeaknessCtrl.saveWeakness)
api.delete('/pokemon/:idUser/weakness/:idType', auth, WeaknessCtrl.deleteWeakness)

api.get('/pokemon/:idUser/strength/:idType', StrengthCtrl.getStrength)
api.get('/pokemon/:idUser/strength', StrengthCtrl.getStrengths)
api.post('/pokemon/:idUser/strength', auth, StrengthCtrl.saveStrength)
api.delete('/pokemon/:idUser/strength/:idType', auth, StrengthCtrl.deleteStrength)

api.get('/move/:id', MoveCtrl.getMove)
api.get('/move', MoveCtrl.getMoves)
api.post('/move', MoveCtrl.saveMove)
api.put('/move/:id', MoveCtrl.updateMove)
api.delete('/move/:id', MoveCtrl.deleteMove)

api.get('/move/:id/learnedType', LearnedTypeCtrl.getLearnedTypes)
api.post('/move/:id/learnedType', LearnedTypeCtrl.saveLearnedType)
api.delete('/move/:id/learnedType', LearnedTypeCtrl.deleteLearnedType)


api.get('/private', auth, function(req, res){
    res.status(200).send({message:'Access granted'})
})

module.exports = api

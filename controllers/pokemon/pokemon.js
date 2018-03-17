const Pokemon = require(global.PATH_MODELS+'pokemon')

function getPokemon(req, res){
    let id = req.params.id
    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        res.status(200).send({pokemon})
    })
}

function getPokemons(req, res){
    Pokemon.find({}, (err, pokemons) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemons) return res.status(404).send({message: `No pokemons were founds`})

        res.status(200).send({pokemons})
    })
}

function savePokemon(req, res){
    console.log('POST /api/pokemon')

    let pokemon = new Pokemon()
    pokemon.name = req.body.name
    pokemon.nickName = req.body.nickName
    pokemon.sex = req.body.sex
    pokemon.type = []
    pokemon.weakness = []
    pokemon.strength = []
    pokemon.level = req.body.level
    pokemon.healthPoint = req.body.healthPoint
    pokemon.moves = []
    pokemon.idUser = req.user
    
    pokemon.save( (err,pokemonStored)=>{
        if(err) return res.status(500).send({message: 'Error on save in the database'})
        
        res.status(200).send({pokemon:pokemonStored})
    })
}

function updatePokemon(req, res){
    let id = req.params.id
    Pokemon.findByIdAndUpdate(id, req.body, {new: true}, (err, pokemonUpdated) =>{
        if(err) return res.status(500).send({message:`Error updating the pokemon ${err}`})

        res.status(200).send({pokemon: pokemonUpdated})
    })
}

function deletePokemon(req, res){
    let id = req.params.id
    Pokemon.findById(id, (err, pokemon)=>{
        if(err) return res.status(500).send({message:`Error deleting the pokemon ${err}`})
        if(!pokemon) return res.status(404).send({message: `pokemon not found`})

        pokemon.remove(err=>{
            if(err) res.status(500).send({message:`Error deleting the pokemon ${err}`})

            res.status(200).send({message:`The pokemon has been deleted`})
        })
    })
}

module.exports = {
    getPokemon,
    getPokemons,
    savePokemon,
    updatePokemon,
    deletePokemon
}
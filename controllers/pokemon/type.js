const Pokemon = require(global.PATH_MODELS+'pokemon/pokemon')
const Type = require(global.PATH_MODELS+'type')

function getType(req, res){
    let id = req.params.idUser
    let idType = req.params.idType

    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        let type = pokemon.type.find(x => x._id == idType)

        res.status(200).send({type})
    })
}

function getTypes(req, res){
    let id = req.params.idUser
    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        res.status(200).send({types:pokemon.type})
    })
}

function saveType(req, res){
    let id = req.params.idUser
    let idType = req.body.idType
    
    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        Type.findById({_id:idType}, (err,type)=>{
            if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
            if(!type) return res.status(404).send({message: `The type does not exist`})
    
            pokemon.type.push(type)

            Pokemon.findByIdAndUpdate(id,pokemon,{new: true}, (err,pokemonUpdated)=>{
                if(err) return res.status(500).send({message:`Error updating the type: ${err}`})
                
                res.status(200).send({pokemon:pokemonUpdated})
            })
        })         
    })
}

function deleteType(req, res){
    let id = req.params.idUser
    let idType = req.params.idType

    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        pokemon.type = pokemon.type.filter(x => x._id != idType)

        Pokemon.findByIdAndUpdate(id,pokemon,{new: true}, (err,pokemonUpdated)=>{
            if(err) return res.status(500).send({message:`Error deleting the type: ${err}`})
            
            res.status(200).send({pokemon:pokemonUpdated})
        })
    })
}

module.exports = {
    getType,
    getTypes,
    saveType,
    deleteType
}
const Pokemon = require(global.PATH_MODELS+'pokemon')
const Type = require(global.PATH_MODELS+'type')

function getStrength(req, res){
    let id = req.params.idUser
    let idType = req.params.idType

    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        let strength = pokemon.strength.find(x => x._id == idType)

        res.status(200).send({strength})
    })
}

function getStrengths(req, res){
    let id = req.params.idUser
    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        res.status(200).send({strengths:pokemon.strength})
    })
}

function saveStrength(req, res){
    let id = req.params.idUser
    let idType = req.body.idType
    
    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        Type.findById({_id:idType}, (err,type)=>{
            if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
            if(!type) return res.status(404).send({message: `The type does not exist`})
    
            pokemon.strength.push(type)

            Pokemon.findByIdAndUpdate(id,pokemon,{new: true}, (err,pokemonUpdated)=>{
                if(err) return res.status(500).send({message:`Error updating the strength: ${err}`})
                
                res.status(200).send({pokemon:pokemonUpdated})
            })
        })         
    })
}

function deleteStrength(req, res){
    let id = req.params.idUser
    let idType = req.params.idType

    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        pokemon.strength = pokemon.strength.filter(x => x._id != idType)

        Pokemon.findByIdAndUpdate(id,pokemon,{new: true}, (err,pokemonUpdated)=>{
            if(err) return res.status(500).send({message:`Error deleting the strength: ${err}`})
            
            res.status(200).send({pokemon:pokemonUpdated})
        })
    })
}

module.exports = {
    getStrength,
    getStrengths,
    saveStrength,
    deleteStrength
}
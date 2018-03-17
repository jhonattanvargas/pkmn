const Pokemon = require(global.PATH_MODELS+'pokemon')
const Type = require(global.PATH_MODELS+'type')

function getWeakness(req, res){
    let id = req.params.idUser
    let idType = req.params.idType

    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        let weakness = pokemon.weakness.find(x => x._id == idType)

        res.status(200).send({weakness})
    })
}

function getWeaknesses(req, res){
    let id = req.params.idUser
    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        res.status(200).send({weaknesses:pokemon.weakness})
    })
}

function saveWeakness(req, res){
    let id = req.params.idUser
    let idType = req.body.idType
    
    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        Type.findById({_id:idType}, (err,type)=>{
            if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
            if(!type) return res.status(404).send({message: `The type does not exist`})
    
            pokemon.weakness.push(type)

            Pokemon.findByIdAndUpdate(id,pokemon,{new: true}, (err,pokemonUpdated)=>{
                if(err) return res.status(500).send({message:`Error updating the weakness: ${err}`})
                
                res.status(200).send({pokemon:pokemonUpdated})
            })
        })         
    })
}

function deleteWeakness(req, res){
    let id = req.params.idUser
    let idType = req.params.idType

    Pokemon.findById(id, (err, pokemon) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!pokemon) return res.status(404).send({message: `The pokemon does not exist`})

        pokemon.weakness = pokemon.weakness.filter(x => x._id != idType)

        Pokemon.findByIdAndUpdate(id,pokemon,{new: true}, (err,pokemonUpdated)=>{
            if(err) return res.status(500).send({message:`Error deleting the weakness: ${err}`})
            
            res.status(200).send({pokemon:pokemonUpdated})
        })
    })
    
}

module.exports = {
    getWeakness,
    getWeaknesses,
    saveWeakness,
    deleteWeakness
}
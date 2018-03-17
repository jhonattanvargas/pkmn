const Move = require(global.PATH_MODELS+'move')
const Type = require(global.PATH_MODELS+'type')

function getLearnedTypes(req, res){
    let id = req.params.id
    Move.findById(id, (err, move) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!move) return res.status(404).send({message: `The move does not exist`})

        res.status(200).send({learnedTypes:move.learnedType})
    })
}

function saveLearnedType(req, res){
    let id = req.params.id

    Move.findById(id, (err, move) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!move) return res.status(404).send({message: `The move does not exist`})

        move.learnedType = req.body.arr

        Move.findByIdAndUpdate(id,move,{new: true}, (err,moveUpdated)=>{
            if(err) return res.status(500).send({message:`Error updating the move: ${err}`})

            res.status(200).send({move:moveUpdated})
        })
    })
}

function deleteLearnedType(req, res){
    let id = req.params.id

    Move.findById(id, (err, move) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!move) return res.status(404).send({message: `The move does not exist`})

        move.learnedType = []

        Move.findByIdAndUpdate(id,move,{new: true}, (err,moveUpdated)=>{
            if(err) return res.status(500).send({message:`Error deleting the learnedType: ${err}`})

            res.status(200).send({move:moveUpdated})
        })
    })
}

module.exports = {
    getLearnedTypes,
    saveLearnedType,
    deleteLearnedType
}

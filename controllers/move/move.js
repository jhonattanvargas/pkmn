const Move = require(global.PATH_MODELS+'move')

function getMove(req, res){
    let id = req.params.id
    Move.findById(id, (err, move) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!move) return res.status(404).send({message: `The move does not exist`})

        res.status(200).send({move})
    })
}

function getMoves(req, res){
    Move.find({}, null, {sort: {'_id': -1}}, (err, moves) =>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!moves) return res.status(404).send({message: `No moves were founds`})

        res.status(200).send({moves})
    })
}

function saveMove(req, res){
    console.log('POST /api/move')

    console.log(req.body)

    let move = new Move()
    move.name = req.body.name
    move.type = req.body.type
    move.learnedType = []
    move.levelMin = req.body.levelMin
    move.levelMax = req.body.levelMax
    move.difficulty = req.body.difficulty
    move.damage = req.body.damage
    move.description = req.body.description
    move.position = req.body.position
    move.speed = req.body.speed
    move.distraction = req.body.distraction
    move.repetition = req.body.repetition
    move.tried = req.body.tried
    move.point = req.body.point
    move.contact = req.body.contact
    move.aoe = req.body.aoe
    move.bodily = req.body.bodily
    move.critical = req.body.critical
    move.timeEffect = req.body.timeEffect

    move.save( (err,moveStored)=>{
        if(err) return res.status(500).send({message: 'Error on save in the database'})

        res.status(200).send({move:moveStored})
    })
}

function updateMove(req, res){
    let id = req.params.id
    Move.findByIdAndUpdate(id, req.body, {new: true}, (err, moveUpdated) =>{
        if(err) return res.status(500).send({message:`Error updating the move ${err}`})

        res.status(200).send({move: moveUpdated})
    })
}

function deleteMove(req, res){
    console.log('DELETE /api/move')
    let id = req.params.id
    console.log(id)
    Move.findById(id, (err, move)=>{
        if(err) return res.status(500).send({message:`Error deleting the move ${err}`})
        if(!move) return res.status(404).send({message: `move not found`})

        move.remove(err=>{
            if(err) res.status(500).send({message:`Error deleting the move ${err}`})

            res.status(200).send({message:`The move has been deleted`})
        })
    })
}

module.exports = {
    getMove,
    getMoves,
    saveMove,
    updateMove,
    deleteMove
}

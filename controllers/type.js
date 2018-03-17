const Type = require(global.PATH_MODELS+'type')

function getType(req, res){
    let id = req.params.id
    Type.findById(id, (err, type)=>{
        if(err) return res.status(500).send({message:`Error processing the request: ${err}`})
        if(!type) return res.status(404).send({message: `The type does not exist`})

        res.status(200).send({type})
    })
}

function getTypes(req, res){
    console.log(req.user)
    Type.find({}, (err, types)=>{
        if(err) return res.status(500).send({message:`Error processing the request ${err}`})
        if(!types) return res.status(404).send({message: `no types were founds`})

        res.status(200).send({types})
    })
}

function saveType(req, res){
    console.log('POST /api/type')

    let type = new Type()

    console.log(req)
    console.log(req.body)
    type.name = req.body.name
    type.displayName = req.body.displayName

    type.save((err,typeStored)=>{
        if(err) return res.status(500).send({message: 'Error on save in the database'})

        res.status(200).send({type:typeStored})
    })
}

function updateType(req, res){
    let id = req.params.id
    Type.findByIdAndUpdate(id, req.body, {new: true}, (err, typeUpdated) =>{
        if(err) return res.status(500).send({message:`Error updating the type ${err}`})

        res.status(200).send({type: typeUpdated})
    })
}

function deleteType(req, res){
    let id = req.params.id
    Type.findById(id, (err, type)=>{
        if(err) return res.status(500).send({message:`Error deleting the type ${err}`})
        if(!type) return res.status(404).send({message: `type not found`})

        type.remove(err=>{
            if(err) res.status(500).send({message:`Error deleting the type ${err}`})

            res.status(200).send({message:`The type has been deleted`})
        })
    })
}

module.exports = {
    getType,
    getTypes,
    saveType,
    updateType,
    deleteType
}

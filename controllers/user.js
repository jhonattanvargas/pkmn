'use strict'

const mongoose = require('mongoose')
const User = require(global.PATH_MODELS+'user')
const services = require(global.PATH_SERVICES)
const bcrypt = require('bcrypt-nodejs')

function signUp (req, res){
    const user = new User({
        mail: req.body.mail,
        displayName: req.body.displayName
    })

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)

        bcrypt.hash(req.body.password, salt, null,(err,hash) =>{
            if(err) return next(err)

            user.password = hash
        })
    })

    user.save(err => {
        if(err) res.status(500).send({message:`Error on create user: ${err}`})

        return res.status(200).send({token: services.createToken(user)})
    })
}

function signIn (req, res){
    console.log(req.body)
    User.findOne({mail: req.body.mail}, (err, user)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!user) return res.status(404).send({message:`user dont exist`})

        bcrypt.compare(req.body.password, user.password, function(error, response) {
            if(error) return res.status(500).send({message:`an Error has ocurred: ${error}`})

            if(response){
                req.user = user
                res.status(200).send({
                    message: `logIn successful`,
                    token: services.createToken(user)
                })
            }else{
                return res.status(404).send({message:`password dont match`})
            }
        })
    })
}

module.exports = {
    signIn,
    signUp
}

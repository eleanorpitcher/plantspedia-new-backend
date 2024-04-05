const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const User = require('../models/User.model')

//signup

router.post('/signup',(req,res,next)=>{
    const {name,email,password} = req.body

    if(email===''||password===''||name===''){
        res.status(400).json({message: "Please provide email, password, and name"})
        return;
    }

    const emailRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if(!emailRegex.test(email)){
        res.status(400).json({message: "Email address not valid."})
        return;
    }

    if(!passwordRegex.test(password)){
        res.status(400).json({message: "Password not valid"})
        return;
    }

    User.findOne({email})
    .then((foundUser)=>{
        if(foundUser){
            res.json({message:'Email already in use'})
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        return User.create({email,password:hashedPassword,name})
    })
    .then((createdUser)=>{
        const {email, name, _id} = createdUser
        const user = {email,name,_id}

        res.status(201).json({user:user})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message: "Internal Server Error"})
    })
})


//login

router.post('/login', (req,res,next)=>{
    const {email,password} = req.body

    if(email===''||password===''){
        res.status(400).json({message: 'Please provide a valid email and password'})
        return;
    }

    User.findOne({email})
        .then((foundUser)=>{
            if(!foundUser){
                res.status(400).json({message: 'User does not exist'})
            }
        })

        const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
        if(passwordCorrect){
            const {_id, email, name} = foundUser;
            const payload = {_id, email, name}

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {algorithm: 'HS256', expiresIn: "6h" }
            )
            res.status(200).json({authToken:authToken});
        }
        else {
            res.status(401).json({message: "Unable to authenticate the user"})
        }
    })
    .catch((err)=>{
        console.log(err)
    });


//verify

router.get('/verify', isAuthenticated, (req,res,next)=>{

})


module.exports = router;
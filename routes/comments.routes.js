const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Comment = require('../models/Comment.model')

router.get('/comments', (req,res,next)=>{
    Comment.find()
    .then((allComments)=>{
        res.json(allComments)
    })
    .catch((err)=>{
        console.log(err)
    })
});

router.post('/comments', (req,res,next)=>{
    Comment.create()
    .then((newComment)=>{
        res.json(newComment)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.delete('/comments/:_id', (req,res,next)=>{
    Comment.findByIdAndDelete(req.params)
    .then(()=>{
        res.json()
    })
    .catch((err)=>{
        console.log(err)
    })
});

module.exports = router;
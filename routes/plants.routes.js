const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Plant = require("../models/Plant.model")

router.get('/plants',(req,res,next)=>{
    Plant.find()
    .then((allPlants)=>{
        res.json(allPlants)
    })
    .catch((err)=>{
        console.log(err)
    })
});

router.get('/plants/:_id', (req,res,next)=>{
    Plant.findById(req.params)
    .then((onePlant)=>{
        res.json(onePlant)
    })
    .catch((err)=>{
        console.log(err)
    })
});

router.post('/plants', (req,res,next)=>{
    Plant.create(req.body)
    .then((newPlant)=>{
        res.json(newPlant)
    })
    .catch((err)=>{
        console.log(err)
    })
});

router.put('/plants/:_id', (req,res,next)=>{
    Plant.findByIdAndUpdate(req.params, req.body)
    .then((editedPlant)=>{
        res.json(editedPlant)
    })
    .catch((err)=>{
        console.log(er)
    })
});

router.delete('/plants/:_id', (req,res,next)=>{
    Plant.findByIdAndDelete(req.params)
    .then(()=>{
        res.json("Plant successfully deleted")
    })
    .catch((err)=>{
        console.log(err)
    })
})


module.exports = router
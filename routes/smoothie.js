    const express = require('express')
    const router = express.Router()
    const Smoothie = require('../models/smoothie');
    const Fruit = require('../models/fruit');

    //SMOOTHIE INDEX  //smoothies
    router.get('/', (req, res) => {
        Smoothie.find()
        .populate({ path: 'fruits', select: 'name'})
        .sort('-createdAt')
        .then(smoothies => {
            res.send(smoothies);
        })
    })
    
    //SMOOTHIE NEW
    router.get('/new', (req, res) => {
        Fruit.find()
        .then(fruits => {
            res.render('smoothies/new', { fruits })
        })
    })
    
    //SMOOTHIE POST
    router.post('/', (req, res) => {
        let smoothie = new Smoothie(req.body)
        let fruits = req.body.arrayOfFruits
    
        if (Array.isArray(fruits)) {
        fruits.forEach(fruitId => {
            smoothie.fruits.push(fruitId)
        })
        } else {
        smoothie.fruits.push(fruits)
        }
    
        smoothie.save()
        .then(smoothie => {
        console.log(smoothie)
        res.redirect('/smoothies')
        })
    })
    



    module.exports = router
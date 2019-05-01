    const express = require('express')
    const router = express.Router()
    const Smoothie = require('../models/smoothie');
    const Fruit = require('../models/fruit').Fruit;

    //INDEX
    router.get('/', (req, res) => {
        Fruit.find()
        .then((fruits)=>{
        res.render('index', { fruits })
        }).catch(err => console.log(err))
    })
    
    //NEW
    router.get('/new', (req, res) => {
        res.render('new')
    })
    
    //POST
    router.post('/', (req, res) => {
    
        let data = {
        name: req.body.name, 
        color: req.body.color
        }
    
        if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on'
        data.readyToEat = true
        } else { // if not checked, req.body.readyToEat is undefined
        data.readyToEat = false
        }
    
        let fruit = new Fruit(data)
        fruit.save()
        .then(()=> {
        res.redirect('/fruits')
        }).catch(err => console.log(err))
    
        
    })
    
    //SHOW
    router.get('/fruits/:indexOfFruitsArray', (req, res) => {
        Fruit.findById(req.params.indexOfFruitsArray)
        .then((fruit)=>{
        res.render('show', {
            fruit: fruit
        })
        })
    })
    
    //EDIT
    router.get('/fruits/:indexOfFruitsArray/edit', (req, res) => {
        Fruit.findById(req.params.indexOfFruitsArray)
        .then(fruit => {
            res.render('edit', { fruit })
        })
    })
    
    //DELETE
    router.delete('/fruits/:indexOfFruitsArray', (req, res) => {
        Fruit.findByIdAndDelete(req.params.indexOfFruitsArray)
        .then(() => {
            res.redirect('/fruits');
        })
    })
    
    //PUT
    router.put('/fruits/:indexOfFruitsArray', (req, res) => {
        let updatedFruit = req.body
        updatedFruit.readyToEat = req.body.readyToEat === 'on' ? true : false
    
        Fruit.findByIdAndUpdate(req.params.indexOfFruitsArray, updatedFruit)
        .then(fruit => {
            res.redirect(`/fruits/${fruit._id}`);
        })
    })

    module.exports = router
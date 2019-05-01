    const router = require('express').Router()

    router.get('/', (req, res) =>{
    Farm.find()
    .then(farms => {
    res.send({ message: "FARM HOME WORKS"})

    })
    .catch (err => {
    res.send(err)
    })

    })

    router.get('/new', (req, res) =>{

    res.render('farms/new')
    })

    router.post('/', (req, res) =>{

        let data = { 
            name : req.body.name,
            fruits : req.body.fruits
        }

        let farm = new Farm(data)
        farm.save()
        .then (() => {
            res.send({ message : "success"})
        }).catch ((err=> {
            res.send({ message : err})
        }))
    })

    module.exports = router
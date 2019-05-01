const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fruitSchema = require('./fruit').fruitSchema

const farmSchema = new Schema ({
    name : { type: String, unique:true },
    fruits : [fruitSchema]
}, {timestamps : true})

const Farm = mongoose.model('Farm', farmSchema )

module.exports = Farm
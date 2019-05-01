// require('dotenv').config();
// const express = require('express');
// const app = express();
// const port = process.env.PORT
// const Fruit = require('./models/fruits');
// const Smoothie = require('./models/smoothie');

// const ejs = require('ejs');
// const methodOverride = require('method-override')
// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/blog_mongo', {useNewUrlParser: true})
// .then(() => console.log('mongodb running'),
// (err) => console.log(err))


// app.set('view engine', 'ejs');

// app.use(express.urlencoded({extended:false}));
// app.use(express.json()) //
// app.use(express.static('public'));
// app.use(methodOverride('_method'));

// //SMOOTHIE INDEX
// app.get('/smoothies',(req, res) => {
// Smoothie.find()
// .populate({ path: 'fruits', select: 'name' })
// .sort('-createdAt')
// .then(smoothies => {
//   res.render('smoothies', {smoothies} )

//   // res.send(smoothies)
// })
// })

// //SMOOTHIE NEW
// app.get('/smoothies/new', (req, res) => {
//   Fruit.find()
//   .then ( fruits => {
//     console.log(fruits);
//     res.render('smoothies/new', {fruits} )

//   })

// })

// //SMOOTHIE POST
// app.post('/smoothies',(req, res) => {
//   let smoothie = new Smoothie (req.body)
//   let fruits = req.body.arrayOfFruits

//   if (Array.isArray(fruits)) {
//     fruits.forEach(fruitId => {
//       smoothie.fruits.push(fruitId)
//     })
//   } else {
//     smoothie.fruits.push(fruits)
//   }
//   smoothie.save()
//   .then(smoothie => {
//     console.log(smoothie)
//     res.redirect('/smoothies')
//   })
//   // res.send(req.body)
// })

// //SMOOTHIE SHOW
// app.get('/smoothies/:indexOfSmoothiesArray', (req, res) => {
// Smoothie.findById(req.params.indexOfSmoothiesArray)
// .populate({ path: 'fruits', select: 'name' })
// .then(smoothie => {
//   res.render('smoothies/show', {smoothie} )
//       })
//   })

//   app.get('/smoothies/:index/edit', (req, res) => {
//     let fruits= []
//      Fruit.find()
//     .then(f => {
//       fruits= f
//     })
//     Smoothie.findById(req.params.index)
//       .then(smoothie => {
//         res.render('smoothies/edit', { smoothie,fruits }) //Fruit.find()
//       })
//   })
// //SMOOTHIE EDIT
// app.get('/smoothies/:indexOfSmoothiesArray/edit', (req, res) => {
//   let fruits= []
//   Fruit.find()
//  .then(f => {
//    fruits= f
//  })

//   Smoothie.findById(req.params.indexOfSmoothiesArray)
//   .then (smoothie =>{
//     res.render('smoothies/edit', {smoothie, fruits})
//   })
//   })
// //SMOOTHIE UPDATE
// app.put('/smoothies/:indexOfSmoothiesArray', (req, res) => {
  
//   let updatedSmoothie = req.body
//   Smoothie.findByIdAndUpdate(req.params.indexOfSmoothiesArray, req.body)
//   .then (smoothie => {
//   res.redirect(`/smoothies/${smoothie._id}`);
// })
// })

// //SMOOTHIE DELETE
// app.delete('/smoothies/:indexOfSmoothiesArray', (req, res) => {
//   Smoothie.findByIdAndDelete(req.params.indexOfSmoothiesArray)
//     .then(() => {
//       res.redirect('/smoothies');
//     })
//       // fruits.splice(req.params.indexOfFruitsArray, 1);

// })

// //INDEX
// app.get('/fruits', (req, res) => {
  
//   Fruit.find()
//   .then((fruits)=>{
//     res.render('index', { fruits })
//   }).catch(err => console.log(err))

// })

// //NEW
// app.get('/fruits/new', (req, res) => {
//   res.render('new')
// })

// //POST
// app.post('/fruits', (req, res) => {

//   let data = {
//     name: req.body.name, 
//     color: req.body.color
//   }

//   if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on'
//     data.readyToEat = true
//   } else { // if not checked, req.body.readyToEat is undefined
//     data.readyToEat = false
//   }

//   let fruit = new Fruit(data)
//   fruit.save()
//   .then(()=> {
//     res.redirect('/fruits')
//   }).catch(err => console.log(err))
// })

// //SHOW
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//   Fruit.findById(req.params.indexOfFruitsArray)
//   .then((fruit)=>{  
//       res.render('show', {
//         fruit: fruit
//       })
//   })
// })

// //EDIT
// app.get('/fruits/:indexOfFruitsArray/edit', (req, res) => {
// Fruit.findById(req.params.indexOfFruitsArray)
// .then (fruit =>{
//   res.render('edit', {fruit})
// })
// })


// //PUT
// app.put('/fruits/:indexOfFruitsArray', (req, res) => {
//   let updatedFruit = req.body
//   updatedFruit.readyToEat = req.body.readyToEat === 'on' ? true : false
 
//   Fruit.findByIdAndUpdate(req.params.indexOfFruitsArray, req.body)
//   .then (fruit => {
//   res.redirect(`/fruits/${fruit._id}`);
// })
//   // fruits[req.params.indexOfFruitsArray] = req.body;
//   // res.redirect('/fruits');
// })

// //DELETE
// app.delete('/fruits/:indexOfFruitsArray', (req, res) => {
//   Fruit.findByIdAndDelete(req.params.indexOfFruitsArray)
//     .then(() => {
//       res.redirect('/fruits');
//     })
//       // fruits.splice(req.params.indexOfFruitsArray, 1);

// })

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// })


require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT
const Fruit = require('./models/fruit');
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const smoothieRoutes = require('./routes/smoothie')
const fruitRoutes = require('./routes/fruit')
const farmRoutes = require('./routes/farm')


mongoose.connect('mongodb://localhost/fruitss', {useNewUrlParser : true})
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) )

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json()) // we need this line for reactjs
app.use(methodOverride('_method'));

app.use('/smoothie', smoothieRoutes)
app.use('/fruits', fruitRoutes)
app.use('/farms', farmRoutes)



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
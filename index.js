const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(data)
    .then(recipeDetails =>{
      for (let i = 0; i < recipeDetails.length; i++) {

        console.log("recipeDetails....",recipeDetails[i].title);
      }
    })
    
    // Recipe.insertMany(data)
    // .then(recipeArrDB =>{

    //   console.log("recipeArr....",recipeArrDB.title);
    // //   for (let i = 0; i < recipeArr.length; i++) {

    // //   }
    // // })

    Recipe.findByIdAndUpdate("63dbe8a3de320166f357d6c4",{duration:100}, {new:true})
    .then(uptadedDuration =>{
      console.log("Succefully modified....",uptadedDuration);
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

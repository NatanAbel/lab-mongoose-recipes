const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const pasta = {
      title: "Pasta",
      level: "Amateur Chef",
      ingredients: [
        "1 pound of your favorite pasta",
        "1 jar of marinara sauce",
        "1 tablespoon of olive oil",
        "Salt and pepper to taste",
        "Grated Parmesan cheese",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://imgs.search.brave.com/jr83Vx-ydx1-PrIwd88hArMChMB85tn4K2z_ChhOvWY/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5L/eXRDVDN5c3g5TTMy/ajRMeG9ad01RSGFF/SyZwaWQ9QXBp",
      duration: 25,
      creator: "Chef Abiel and Borja",
    };

    Recipe.create(pasta).then((recipeDetails) => {
      console.log("recipeDetails....", recipeDetails.title);
    });

    Recipe.insertMany(data).then((recipeArr) => {
      for (let i = 0; i < recipeArr.length; i++) {
        console.log("recipeArr....", recipeArr[i].title);
      }
    });

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    ).then((updatedDuration) => {
      console.log("Duration Updated...", updatedDuration);
    });

    Recipe.deleteOne({ title: "Carrot Cake" }).then((deletedRecipe) => {
      console.log("Deleted Recipe...", deletedRecipe);
    })
    .then(() => mongoose.connection.close())
    
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });



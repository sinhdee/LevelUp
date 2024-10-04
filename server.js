const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');

// Importing Controllers (Importing controller files that contain logic for handling user, game, and codStat routes.)
const userController = require('./controllers/userController');
const gameController = require('./controllers/gameController');
const codStatController = require('./controllers/codStatController');

// set views directory and view engine
app.set("views", path.join(__dirname, "views"));


// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Connecting MongoDB
mongoose.connect(process.env.MONGODB_URI);

//MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err)
})

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use(express.static('public'));

//Set view engine 
app.set('view engine', 'ejs');

// Starting the Server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});


// ===== ROUTES ===== //

//Landing Page 
app.get("/", (req,res) => {
  res.render("index");
});

// ========== User Routes ========== //
app.get("/user/new", userController.getUserForm);
app.post("/user", userController.createUser);
app.get("/user/:id", userController.showUser);

// ========== Game Routes ========== //
app.get("/game/new", (req, res) => res.render("games/new"));
app.post("/game", gameController.createGame);
app.get("/game/:id", gameController.showGame);

// ========== CodStat Routes ========== //
app.get("/codStats", codStatController.showAllStats);
app.get("/codStats/:id", codStatController.showStat);
app.get("/codStats/new", (req, res) => res.render("codStats/new"));
app.delete("/codStats/:id", codStatController.deleteStat);


//Show Route 
app.get("/codStats/:id", async (req, res) => {
  try {
    const foundCodStat = await codStat.findById(req.params.id);
    const contextData = { codStat: foundCodStat };
    res.render("codStats/show", contextData);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//Index Route 
app.get("/codStats", async (req,res)=>{
  try {
    const allcodStats = await codStat.find();
    res.render("codStats/index", { codStats: allcodStats, message: " All your Stats"});
  } catch (err) {
    console.log(err)
    res.redirect("/");
  }
    });


//Delete Route 
app.delete("/codStats/:id", async (req, res) => {
try{
  await codStat.findByIdAndDelete(req.params.id);
  res.redirect("/codStats");
}catch (err) {
  console.log(err);
  res.redirect("/codStats");
}
});
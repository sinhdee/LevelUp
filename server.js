const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const codStat = require('./models/codStat')
const game = require('./models/game')
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');

// Importing Controllers (Importing controller files that contain logic for handling user, game, and codStat routes.)
const userController = require('./controllers/userController');
const gameController = require('./controllers/gameController');
const codStatController = require('./controllers/codStatController');
const User = require("./models/user");

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
    res.render("codStats/show", { codStat: foundCodStat });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});


//Index Route 
app.get("/codStats", async (req,res)=>{
  try {
    const allCodStats = await codStat.find();
    res.render("index", { codStats: allCodStats, message: " All your Stats"});
  } catch (err) {
    console.log(err)
    res.redirect("/");
  }
})

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

//POST/Create Route 
app.post("/codStats", async (req, res) => {
  try {
    req.body.winlose = req.body.winlose === "on";
    const newCodStat = await codStat.create(req.body);
    res.redirect(`/codStats/${newCodStat._id}`);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//EDIT ROUTE 
app.get("/codStats/:codStatId/edit", async (req,res) => {
  try {
    const codStatToEdit = await codstat.findById(req.params.codstatId);
    res.render("codStats/edit", { codStat: codstatToEdit});
  } catch(err) {
    res.redirect(`/`);
  }
});

//UPDATE ROUTE
app.put("/codStats/:id", async (req, res) => {
  try {
    if (req.body.winlose === "on") {
      req.body.winlose = true;
    } else {
      req.body.winlose= false;
    }

    await codStat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/codStats/${req.params.id}`);
  } catch (err) {
    res.redirect(`/codStats/${req.params.id}`);
  }
});

// Starting the Server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
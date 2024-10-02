const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');
app.set("views", path.join(__dirname, "views"));



// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
//Set view engine 
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

//Landing Page 
app.get("/", (req,res) => {
  res.render("index");
});
//Render New Page 
app.get("/codstats/new", (req,res) => {
  res.render("codstats/new");
});

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
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

// Import Models and Controllers
const codStat = require('./models/codStat');
const userController = require('./controllers/userController');
const gameController = require('./controllers/gameController');
const codStatController = require('./controllers/codStatController');

// Set views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Connecting MongoDB
mongoose.connect(process.env.MONGODB_URI);

// MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static('public'));

// ===== ROUTES ===== //

// Landing Page
app.get("/", (req, res) => {
  res.render("index");
});

// ========== User Routes ========== //
app.get("/users/new", userController.getUserForm);
app.post("/users", userController.createUser);
app.get("/users/:id", userController.showUser);
app.get("/users", userController.showAllUsers);

// ========== Game Routes ========== //
app.get("/games/new", (req, res) => res.render("games/new"));
app.post("/games", gameController.createGame);
app.get("/games/:id", gameController.showGame);
app.get("/games", gameController.showAllGames);

// ========== CodStat Routes ========== //
app.get("/codStats", codStatController.showAllStats);
app.get("/codStats/new", (req, res) => res.render("codStats/new"));
app.post("/codStats", codStatController.createStat);
app.get("/codStats/stat", (req, res) => res.render("codStats/stat"));
app.get("/codStats/:id", codStatController.showStat);
app.get("/codStats/:id/edit", codStatController.renderEditStatForm);
app.put("/codStats/:id", codStatController.updateStat);
app.delete("/codStats/:id", codStatController.deleteStat);

// Starting the Server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
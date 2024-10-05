const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

// Import Models and Controllers
const userController = require('./controllers/userController');
const gameController = require('./controllers/gameController');
const codStatController = require('./controllers/codStatController');


// Set views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Connecting MongoDB
mongoose.connect(process.env.MONGODB_URI).catch(err => console.log(`Connection error: ${err}`));

// MongoDB Connection Event Handlers
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


// Middleware
app.use(express.urlencoded({ extended: false })); // Parses form data
app.use(methodOverride("_method")); // Overrides methods for PUT/DELETE
app.use(morgan("dev")); // Logs HTTP requests
app.use(express.static('public')); // Serves static files

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
app.get("/users/:id/edit", userController.renderEditUserForm);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

// ========== Game Routes ========== //
app.get("/games/new", gameController.renderNewGameForm); // Updated
app.post("/games", gameController.createGame);
app.get("/games/:id/edit", gameController.renderEditGameForm);
app.get("/games/:id", gameController.showGame);
app.get("/games", gameController.showAllGames);
app.put("/games/:id", gameController.updateGame);
app.delete("/games/:id", gameController.deleteGame);

// ========== CodStat Routes ========== //
app.get("/codStats", codStatController.showAllStats);
app.get("/codStats/new", codStatController.renderNewStatForm); // Updated
app.post("/codStats", codStatController.createStat);
app.get("/codStats/stat", (req, res) => res.render("codStats/stat"));
app.get("/codStats/:id", codStatController.showStat);
app.get("/codStats/:id/edit", codStatController.renderEditStatForm);
app.put("/codStats/:id", codStatController.updateStat);
app.delete("/codStats/:id", codStatController.deleteStat);


// Catch-all Route (404 Not Found)
app.use((req, res) => {
  res.status(404).render('404', { message: "Page not found" });
});

// Starting the Server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
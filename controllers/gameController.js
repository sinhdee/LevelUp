const Game = require('../models/game');

// Create a new game
const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.redirect(`/games/${newGame._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while creating the game." });
  }
};

// Show game details
const showGame = async (req, res) => {
  try {
    const foundGame = await Game.findById(req.params.id).populate('codStats');
    if (foundGame) {
      res.render("games/show", { game: foundGame });
    } else {
      res.status(404).render("error", { message: "Game not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while fetching the game details." });
  }
};

// Render edit form for a game
const renderEditGameForm = async (req, res) => {
  try {
    const foundGame = await Game.findById(req.params.id);
    if (foundGame) {
      res.render("games/edit", { game: foundGame });
    } else {
      res.status(404).render("error", { message: "Game not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while fetching the game for editing." });
  }
};

// Update a game
const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedGame) {
      res.redirect(`/games/${req.params.id}`);
    } else {
      res.status(404).render("error", { message: "Game not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while updating the game." });
  }
};

// Delete a game
const deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.redirect("/games");
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while deleting the game." });
  }
};

module.exports = {
  createGame,
  showGame,
  renderEditGameForm,
  updateGame,
  deleteGame
};

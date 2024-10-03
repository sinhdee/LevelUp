const Game = require('../models/game');

// Create a new game
const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.redirect(`/games/${newGame._id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/games/new");
  }
};

// Show game details
const showGame = async (req, res) => {
  try {
    const foundGame = await Game.findById(req.params.id).populate('codStats');
    res.render("games/show", { game: foundGame });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

module.exports = {
  createGame,
  showGame
};

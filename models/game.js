const mongoose = require('mongoose');

// Game Schema
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  releaseDate: { type: Date },
  codStats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CodStat' }] // Reference to CodStat
});

// Model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
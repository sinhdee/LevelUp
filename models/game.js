const mongoose = require('mongoose');

// Game Schema
const gameSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true // Removes extra spaces
  },
  platform: { 
    type: String, 
    required: true, 
    trim: true // Removes extra spaces
  },
  releaseDate: { 
    type: Date 
  },
  codStats: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CodStat'  // Reference to CodStat model
  }]
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

// Model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

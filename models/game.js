const mongoose = require('mongoose');

// Game Schema
const gameSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, // Removes extra spaces
    minlength: [2, 'Title must be at least 2 characters long'],  // Min length validation
    maxlength: [100, 'Title cannot exceed 100 characters']  // Max length validation
  },
  platform: { 
    type: String, 
    required: true, 
    trim: true, // Removes extra spaces
    minlength: [2, 'Platform must be at least 2 characters long'],  // Min length validation
    maxlength: [50, 'Platform cannot exceed 50 characters']  // Max length validation
  },
  releaseDate: { 
    type: Date,
    validate: {
      validator: function(value) {
        return value <= new Date(); // Ensures release date is not in the future
      },
      message: 'Release date cannot be in the future'
    }
  },
  codStats: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CodStat'  // Reference to CodStat model
  }]
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

// Model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

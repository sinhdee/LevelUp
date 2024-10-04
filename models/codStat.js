const mongoose = require('mongoose');

// Schema
const codStatsSchema = new mongoose.Schema({
    kills: { 
        type: Number, 
        required: true, 
        min: [0, 'Kills must be a positive number']  // Validation: non-negative number
    },
    deaths: { 
        type: Number, 
        required: true  // No min validation, allowing negative numbers
    },
    assists: { 
        type: Number, 
        required: true, 
        min: [0, 'Assists must be a positive number']  // Validation: non-negative number
    },
    winLose: { 
        type: Boolean, 
        required: true 
    },
    rank: { 
        type: String, 
        required: true,
        trim: true // Removes extra spaces around rank
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Model
const CodStat = mongoose.model('CodStat', codStatsSchema);

module.exports = CodStat;
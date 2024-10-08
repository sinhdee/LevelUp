const mongoose = require('mongoose');

// Schema
const codStatsSchema = new mongoose.Schema({
    kills: { 
        type: Number, 
        required: true, 
        min: [0, 'Kills must be a positive number'],  // Validation: non-negative number
        max: [1000, 'Kills cannot exceed 1000'] // Example max validation
    },
    deaths: { 
        type: Number, 
        required: true  // No min validation, allowing negative numbers
    },
    assists: { 
        type: Number, 
        required: true, 
        min: [0, 'Assists must be a positive number'],  // Validation: non-negative number
        max: [500, 'Assists cannot exceed 500'] // Example max validation
    },
    winLose: { 
        type: Boolean, 
        required: true, 
        default: false // Default value for boolean field
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

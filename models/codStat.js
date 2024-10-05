const mongoose = require('mongoose');

// Schema
const codStatsSchema = new mongoose.Schema({
    kills: { type: Number, required: true },
    deaths: { type: Number, required: true },
    assists: { type: Number, required: true },
    winLose: { type: Boolean, required: true },
    rank: { type: String, required: true }
});

// Model
const codStat = mongoose.model('CodStat', codStatsSchema);

module.exports = codStat;
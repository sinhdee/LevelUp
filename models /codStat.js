const mongoose = require('mongoose')

//Schema 
const codStatsSchema = new mongoose.Schema({
    Kills: Number,
    Deaths: Number,
    Assists: Number, 
    WinLose: Boolean,
    Rank: String
})

const codStat = mongoose.model("codStat", codStatsSchema)

module.exports = mongoose.model("codStat",codStatsSchema)
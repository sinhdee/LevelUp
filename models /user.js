const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hash this
  codStats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CodStat' }] // Reference to CodStat
});

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

// User Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true  // Trim spaces from the username
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,  // Trim spaces from the email
    match: [/.+@.+\..+/, 'Please enter a valid email address']  // Simple email validation
  },
  password: { 
    type: String, 
    required: true 
  }, // We will hash this before saving
  codStats: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CodStat'  // Reference to CodStat model
  }]
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

// Pre-save middleware to hash password before saving a user
userSchema.pre('save', async function (next) {
  try {
    // If the password is not modified, move on
    if (!this.isModified('password')) return next();

    // Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;

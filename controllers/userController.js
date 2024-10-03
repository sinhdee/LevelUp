const User = require('../models/user.js');
const getUserForm = async (req, res) => res.render("users/new") 

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/users/new');
  }
};

// Show user details
const showUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id).populate('codStats');
    res.render("users/show", { user: foundUser });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

module.exports = {
  createUser,
  showUser, getUserForm
};
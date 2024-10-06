const User = require('../models/user.js');

// Render the form for creating a new user
const getUserForm = async (req, res) => {
  try {
    res.render("users/new");
  } catch (err) {
    console.log("Error in getUserForm:", err);
    res.status(500).render('error', { message: "An error occurred while rendering the form." });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).render('error', { message: "An error occurred while creating the user." });
  }
};

// Show user details
const showUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id).populate('codStats');
    if (foundUser) {
      res.render("users/show", { user: foundUser });
    } else {
      res.status(404).render('error', { message: "User not found." });
    }
  } catch (err) {
    console.log("Error in showUser:", err);
    res.status(500).render('error', { message: "An error occurred while fetching the user details." });
  }
};

// Show all users
const showAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index', { users });
  } catch (err) {
    console.log("Error in showAllUsers:", err);
    res.status(500).render('error', { message: "An error occurred while fetching users." });
  }
};

// Render the form to edit a user
const renderEditUserForm = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (foundUser) {
      res.render("users/edit", { user: foundUser });
    } else {
      res.status(404).render('error', { message: "User not found." });
    }
  } catch (err) {
    console.log("Error in renderEditUserForm:", err);
    res.status(500).render('error', { message: "An error occurred while fetching the user for editing." });
  }
};

// Update a user's details
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.redirect(`/users/${updatedUser._id}`);
    } else {
      res.status(404).render('error', { message: "User not found." });
    }
  } catch (err) {
    console.log("Error in updateUser:", err);
    res.status(500).render('error', { message: "An error occurred while updating the user." });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.log("Error in deleteUser:", err);
    res.status(500).render('error', { message: "An error occurred while deleting the user." });
  }
};

module.exports = {
  createUser,
  showUser,
  getUserForm,
  showAllUsers,
  renderEditUserForm,
  updateUser,
  deleteUser
};

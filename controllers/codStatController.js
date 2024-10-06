const CodStat = require('../models/codStat');

// Show all stats
const showAllStats = async (req, res) => {
  try {
    const allCodStats = await CodStat.find();
    res.render("codStats/index", { codStats: allCodStats, message: "All your Stats" });
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while fetching stats." });
  }
};

// Show specific stat
const showStat = async (req, res) => {
  try {
    const foundCodStat = await CodStat.findById(req.params.id);
    if (foundCodStat) {
      res.render("codStats/show", { codStat: foundCodStat });
    } else {
      res.status(404).render("error", { message: "Stat not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while fetching the stat." });
  }
};

// Create a new stat (form rendering)
const renderNewStatForm = (req, res) => {
  try {
    res.render("codStats/new");
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while rendering the form." });
  }
};

// Create a new stat (submission)
const createStat = async (req, res) => {
  try {
    // Ensure that the winLose value is properly cast to a boolean
    req.body.winLose = req.body.winLose === 'true'; // Convert string to boolean
    const newCodStat = new CodStat(req.body);
    await newCodStat.save();
    res.redirect("/codStats");
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while creating the stat." });
  }
};

// Edit a stat (form rendering)
const renderEditStatForm = async (req, res) => {
  try {
    const foundCodStat = await CodStat.findById(req.params.id);
    if (foundCodStat) {
      res.render("codStats/edit", { codStat: foundCodStat });
    } else {
      res.status(404).render("error", { message: "Stat not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while fetching the stat for editing." });
  }
};

// Update specific stat
const updateStat = async (req, res) => {
  try {
    // Ensure that the winLose value is properly cast to a boolean
    req.body.winLose = req.body.winLose === 'true'; // Convert string to boolean
    const updatedCodStat = await CodStat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/codStats/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while updating the stat." });
  }
};

// Delete specific stat
const deleteStat = async (req, res) => {
  try {
    await CodStat.findByIdAndDelete(req.params.id);
    res.redirect("/codStats");
  } catch (err) {
    console.log(err);
    res.status(500).render("error", { message: "An error occurred while deleting the stat." });
  }
};

module.exports = {
  showAllStats,
  showStat,
  renderNewStatForm,
  createStat,
  renderEditStatForm,
  updateStat,
  deleteStat
};

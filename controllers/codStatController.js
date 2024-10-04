const CodStat = require('../models/codStat');

// Show all stats
const showAllStats = async (req, res) => {
  try {
    const allCodStats = await CodStat.find();
    res.render("index", { codStats: allCodStats, message: "All your Stats" });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

// Show specific stat
const showStat = async (req, res) => {
  try {
    const foundCodStat = await CodStat.findById(req.params.id);
    if (foundCodStat) {
      res.render("codStats/show", { codStat: foundCodStat });
    } else {
      res.status(404).send("Stat not found");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

// Delete specific stat
const deleteStat = async (req, res) => {
  try {
    await CodStat.findByIdAndDelete(req.params.id);
    res.redirect("/codStats");
  } catch (err) {
    console.log(err);
    res.redirect("/codStats");
  }
};

module.exports = {
  showAllStats,
  showStat,
  deleteStat
};

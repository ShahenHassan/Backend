const express = require("express");
const router = express.Router();

router.get("/drinks", (req, res) => {
  res.render("drinks");
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/desserts", (req, res) => {
  res.send("Here are our delicious desserts!");
});


module.exports = router;

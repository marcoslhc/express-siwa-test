const express = require("express");

const router = express.Router();

function get(req, res) {
  res.render("loggedIn/index.html");
}

router.get("/", get);

module.exports = router;

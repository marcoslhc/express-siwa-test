const express = require("express");

const router = express.Router();

const { CLIENT_ID, REDIRECT_URI } = process.env;

function get(req, res) {
  res.render("index.html", {
    nonce: "some",
    state: "some",
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI
  });
}

router.get("/", get);

module.exports = router;

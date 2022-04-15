const express = require("express");
const oauth = require("../../lib/oauth");
const router = express.Router();

async function post(req, res) {
  const {
    body: { id_token: token }
  } = req;
  const { authorized } = await oauth.verify(token);

  if (authorized) {
    return res.json({ authorized: true });
  }

  res.status(401).json({
    message: "unauthorized"
  });
}

router.get("/", post);
router.post("/", post);
module.exports = router;

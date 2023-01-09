const express = require("express");
const router = express.Router();
const loginUser = require("../controllers/accessTokenController");
const verifyJwt = require("../middleware/verify");

router.get("/", loginUser.getUser);

module.exports = router;

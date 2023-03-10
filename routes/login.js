const express = require("express");
const router = express.Router();
const loginUser = require("../controllers/loginController");
const verifyJwt = require("../middleware/verify");

router.post("/", loginUser.userLogin);

module.exports = router;

const express = require("express");
const router = express.Router();
const loginUser = require("../controllers/loginController");

router.post("/", loginUser.userLogin);

module.exports = router;

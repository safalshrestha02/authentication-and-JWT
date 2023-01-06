const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/registerController");

router.post("/", registerUser.createNewUsers);

module.exports = router;

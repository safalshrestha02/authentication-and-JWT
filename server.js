const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const registerNewUser = require("./routes/register");
const login = require("./routes/login");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/register", registerNewUser);
app.use("/login", login);

app.listen(3500);

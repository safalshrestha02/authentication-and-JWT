const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const registerNewUser = require("./routes/register");
const login = require("./routes/login");
const getUsers = require("./routes/getUsers");
const refresh = require("./routes/refreshToken");
const verifyJwt = require("./middleware/verify");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/post", verifyJwt, getUsers);
app.use("/register", registerNewUser);
app.use("/login", login);
app.use("/refresh", refresh);

app.listen(3500);

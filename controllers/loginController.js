const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

exports.userLogin = async (req, res, next) => {
  const { user, pass } = req.body;

  if (!user || !pass) return res.send("Username and password is required");

  const getUser = userDB.users.find((person) => person.username === user);

  if (!getUser) return res.send("User not found");

  const pwdMatch = await bcrypt.compare(pass, getUser.password);
  if (pwdMatch) {
    const accessToken = jwt.sign(
      {
        username: getUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      {
        username: getUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const otherUsers = userDB.users.filter(
      (person) => person.username !== getUser.username
    );
    const currentUser = { ...getUser, refreshToken };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({ accessToken });
    //res.send(`${user} logged in`);
  } else {
    res.sendStatus(401);
  }
};

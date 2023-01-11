const jwt = require("jsonwebtoken");
require("dotenv").config();

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

exports.userRefreshToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(401);
  // console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  const getUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!getUser) return res.send("User not found");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || getUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        username: decoded.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken });
  });
};

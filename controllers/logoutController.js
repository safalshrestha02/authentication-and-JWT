const fsPromises = require("fs").promises;
const path = require("path");

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

exports.logout = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  //check in the refresh token is in the database
  const getUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!getUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.send("successful");
  }

  //delete refresh token

  const otherUsers = userDB.users.filter((person) => {
    person.refreshToken !== getUser.refreshToken;
  });
  const currentUser = { ...getUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(userDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

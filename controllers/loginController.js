const bcrypt = require("bcrypt");

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
    res.send(`Logged in as ${user}`);
  } else {
    res.sendStatus(401);
  }
};

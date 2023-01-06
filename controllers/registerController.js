const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

exports.createNewUsers = async (req, res, next) => {
  const { user, pass } = req.body;

  if (!user || !pass) return res.send("Username and password is required");

  const duplicateUsername = userDB.users.find(
    (uname) => uname.username === user
  );
  if (duplicateUsername) return res.send("Username already taken");

  try {
    const encryptedPwd = await bcrypt.hash(pass, 10);
    const newUser = { username: user, password: encryptedPwd };
    userDB.setUsers([...userDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);

    res.send(`Created user ${user}`);
  } catch (error) {
    console.log(error);
  }
};

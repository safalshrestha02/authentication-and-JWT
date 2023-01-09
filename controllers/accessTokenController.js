const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

exports.getUser = async (req, res, next) => {
  res.json(userDB.users.filter((post) => post.username === req.user.username));
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

module.exports = verifyJwt;

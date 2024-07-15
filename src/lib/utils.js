const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hash = async (value) => bcrypt.hash(value, 10);

const compareHash = async (value, hash) => bcrypt.compare(value, hash);

const generateToken = async (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

const verifyToken = async (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  compareHash,
  hash,
  generateToken,
  verifyToken,
};

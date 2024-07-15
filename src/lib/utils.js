const bcrypt = require("bcrypt");

const compareHash = async (value, hash) => bcrypt.compare(value, hash);

const hash = async (value) => bcrypt.hash(value, 10);

const generateToken = async (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

module.exports = {
  compareHash,
  hash,
  generateToken
};

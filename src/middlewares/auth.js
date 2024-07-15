const { verifyToken } = require("../lib/utils");
const User = require("../modules/User");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token || !token.length) {
      throw new Error("Token not found");
    }
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Token not valid");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = auth;

const { verifyToken } = require("../lib/utils");

const adminOnly = async (req, res, next) => {
  const user = verifyToken(req.cookies.token);

  if (!user || user.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};

module.exports = adminOnly;

const adminOnly = async (req, res, next) => {
  const user = req.cookies.user;

  if (!user || user.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};

module.exports = adminOnly;

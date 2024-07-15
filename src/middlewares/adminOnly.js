const adminOnly = async (req, res, next) => {
  const user = req.user;
  
  if (user.role === "ADMIN") return next();

  return res.status(401).json({ message: "Unauthorized" });
};

module.exports = adminOnly;
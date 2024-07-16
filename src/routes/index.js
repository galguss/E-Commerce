const router = require("express").Router();
const adminOnly = require("../middlewares/adminOnly");

router.use("/user", require("./user"));
router.use("/admin",require("./accounts"));
router.use("/admin",require("./category"));
router.use("/admin",require("./product"));

module.exports = router;

const router = require("express").Router();
const adminOnly = require("../middlewares/adminOnly");
const auth = require("../middlewares/auth");

router.use("/user", require("./user"));
router.use("/user", require("./orders"));
router.use("/admin",require("./accounts"));
router.use("/admin",require("./category"));
router.use("/admin",require("./product"));

module.exports = router;

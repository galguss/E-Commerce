const router = require("express").Router();
const adminOnly = require("../middlewares/adminOnly");
const auth = require("../middlewares/auth");

router.use("/user", require("./user"));
router.use("/user", auth, require("./orders"));

router.use("/admin", adminOnly, require("./dashboard"));

router.use("/admin", adminOnly, require("./accounts"));
router.use("/admin", adminOnly, require("./category"));
router.use("/admin", adminOnly, require("./product"));

module.exports = router;

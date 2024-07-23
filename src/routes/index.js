const router = require("express").Router();
const adminOnly = require("../middlewares/adminOnly");
const auth = require("../middlewares/auth");
const { showShop, showCart } = require("../controllers/global");

router.use("/user", require("./user"));
router.use("/user", auth, require("./orders"));
router.get("/cart", auth, showCart);
router.get("/home", auth, showShop);

router.use("/admin", adminOnly, require("./dashboard"));

router.use("/admin", adminOnly, require("./accounts"));
router.use("/admin", adminOnly, require("./category"));
router.use("/admin", require("./product"));

module.exports = router;

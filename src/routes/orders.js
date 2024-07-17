const router = require("express").Router();

const {
  searchOrders,
  createOrder
  } = require("../controllers/orders");

router.get("/showOrders/:userId", searchOrders);
router.post("/create-Order", createOrder);

module.exports = router;
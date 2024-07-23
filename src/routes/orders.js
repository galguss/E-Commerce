const router = require("express").Router();

const {
  searchOrders,
  createOrder,
  ordersGroupBy
  } = require("../controllers/orders");

router.get("/showOrders/:userId", searchOrders);
router.get('/groupBy/:month/:year', ordersGroupBy)

router.post("/create-Order", createOrder);

module.exports = router;
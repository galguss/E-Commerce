const router = require("express").Router();

const {
  searchOrders,
  createOrder,
  ordersGroupBy,
  orderConfirmation,
  getUserOrder,
  filterForOrder
  } = require("../controllers/orders");

router.get("/showOrders/:userId", searchOrders);
router.get('/groupBy/:month/:year', ordersGroupBy)

router.post("/create-Order", createOrder);
router.post("/user-Order", getUserOrder);
router.post("/filter-Order", filterForOrder);

router.patch("/update-Order", orderConfirmation);

module.exports = router;
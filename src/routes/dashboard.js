const router = require("express").Router();

const {
    showDashboard,
    addProduct,
    updateProduct
  } = require("../controllers/dashboard");

  router.get('/dashboard', showDashboard);
  router.get('/dashboard/add-product', addProduct);
  router.get('/dashboard/update-product/:ID', updateProduct);

module.exports = router;
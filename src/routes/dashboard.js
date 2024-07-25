const router = require("express").Router();

const {
    showDashboard,
    addProduct,
    updateProduct,
    salesData
  } = require("../controllers/dashboard");

  router.get('/dashboard', showDashboard);
  router.get('/sales-data', salesData);
  router.get('/dashboard/add-product', addProduct);
  router.get('/dashboard/update-product/:ID', updateProduct);

module.exports = router;
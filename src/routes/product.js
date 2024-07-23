const router = require("express").Router();
const upload = require("../middlewares/upload");
const adminOnly = require("../middlewares/adminOnly");

const {
  getAllProducts,
  searchProduct,
  createProduct,
  updateproduct,
  deleteProduct,
  filterForProduct
  } = require("../controllers/product");

router.get("/all-product", getAllProducts);

router.post("/search-product", searchProduct);
router.post("/create-product", adminOnly, upload.single('image'), createProduct);
router.post("/filter-product", filterForProduct);

router.patch("/update-product", adminOnly, upload.single('image'), updateproduct);

router.delete("/delete-product", adminOnly,deleteProduct);


module.exports = router;
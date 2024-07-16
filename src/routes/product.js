const router = require("express").Router();
const upload = require("../middlewares/upload");

const {
  getAllProducts,
  searchProduct,
  createProduct,
  updateproduct,
  deleteProduct
  } = require("../controllers/product");

router.get("/all-product", getAllProducts);
router.post("/search-product", searchProduct);
router.post("/create-product",upload.single('image') ,createProduct);
router.patch("/update-product", updateproduct);
router.delete("/delete-product", deleteProduct);


module.exports = router;
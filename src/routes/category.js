const router = require("express").Router();

const {
    getAllCategories,
    searchCategory,
    createCategory,
    updateCategory,
    deleteCategory
  } = require("../controllers/category");

router.get("/all-categories", getAllCategories);
router.post("/search-category", searchCategory);
router.post("/create-category", createCategory);
router.patch("/update-category", updateCategory);
router.delete("/delete-category", deleteCategory);


module.exports = router;
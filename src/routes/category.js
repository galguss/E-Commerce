const router = require("express").Router();

const {
    addCategory,
    editCategory,
    searchCategory,
    createCategory,
    updateCategory,
    deleteCategory
  } = require("../controllers/category");

router.get("/add-category", addCategory);
router.get("/edit-category/:id", editCategory);

router.post("/search-category", searchCategory);
router.post("/create-category", createCategory);

router.patch("/update-category", updateCategory);

router.delete("/delete-category", deleteCategory);


module.exports = router;
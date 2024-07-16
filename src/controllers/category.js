const Category = require("../modules/Category");
const { createCategorySchema, UpdateCategorySchema } = require("../lib/validators/auth");
const { z } = require("zod");

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(201).json(categories);
}

const searchCategory = async (req, res) => {
    try {
        const { category } = createCategorySchema.parse(
            req.body
        );

        const item = await Category.findOne({ category });

        if(!item){
          return  res.status(422).json({ message: "This category does not exist in the system" });
        }

        res.status(201).json(item);
        
    } catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const createCategory = async (req, res) => {
    try {
      const { category } = createCategorySchema.parse(
        req.body
      );
      
      const categoryExists = await Category.findOne({ category });
      
      if (categoryExists) {
        return res.status(422).json({ message: "Category already exists" });
      }
      
      const categoryDB = new Category({
        category
      });
      
      categoryDB.save();
      res.status(201).json({ message: "Category created" });
    } catch (error) {
      console.error(error);
  
      if (error instanceof z.ZodError) {
        const { message } = error.errors[0];
        return res.status(422).json({ message: `Validation Error: ${message}` });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateCategory = async (req, res) => {
    try {
        const {id , category} = UpdateCategorySchema.parse(
            req.body
        );

        const categoryDB ={
            category
        };
        
        await Category.findByIdAndUpdate(id, categoryDB);
        res.status(201).json({ message: "Category Updated" });

    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
          }
          res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        await Category.findByIdAndDelete(id);
        res.status(201).json({ message: "Category Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllCategories,
    searchCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
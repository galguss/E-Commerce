const Category = require("../modules/Category");
const { createCategorySchema, updateCategorySchema, idCategorySchema } = require("../lib/validators/category");
const { z } = require("zod");

const addCategory = async (req, res) => {
    res.status(200).render('categoryForm', {category:{}});
}

const editCategory = async (req, res) => {
  try {
    const { id } = idCategorySchema.parse(
      req.params
    );

    const item = await Category.findById(id);

     if(!item){
        return  res.status(404).json({ message: "This category does not exist in the system" });
      }

      res.status(200).render('categoryForm',{category: item});

  } catch (error) {

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
  }

  res.status(500).json({ message: "Internal Server Error" });

  }
}

const searchCategory = async (req, res) => {
    try {
        const { category } = createCategorySchema.parse(
            req.body
        );

        const item = await Category.findOne({ category });

        if(!item){
          return  res.status(404).json({ message: "This category does not exist in the system" });
        }
        console.log(category);
        res.status(200).json(item);
        
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
        return res.status(409).json({ message: "Category already exists" });
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
        const {id , category} = updateCategorySchema.parse(
            req.body
        );

        const categoryDB ={
            category
        };
        
        const data = await Category.findByIdAndUpdate(id, categoryDB);
        
        if(data === null){
          return res.status(204).json({message: "Updated feild"})
        }

        res.status(200).json({ message: "Category Updated" });

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
        const { id } = idCategorySchema.parse(
          req.body
        );

        const data = await Category.findByIdAndDelete(id);

        if(data === null){
          return res.status(204).json({message: "Deleted feild"})
        }

        res.status(200).json({ message: "Category Deleted" });
    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
          const { message } = error.errors[0];
          return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    addCategory,
    editCategory,
    searchCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
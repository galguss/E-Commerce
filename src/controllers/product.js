const Product = require("../modules/Product");
const { productSchema, productUpdateSchema, searchProductSchema } = require("../lib/validators/auth");
const { z } = require("zod");

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(201).json(products);
}

const searchProduct = async (req, res) => {
    try {
        const { productName } = searchProductSchema.parse(
            req.body
        );

        const product = await Product.findOne({ productName });

        if(!product){
          return  res.status(422).json({ message: "This product does not exist in the system" });
        }

        res.status(201).json(product);
        
    } catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const createProduct = async (req, res) => {
    try {
      const { productName, description, price, category } = productSchema.parse(
        req.body
      );
      const { filename } = req.file;
      const pathImage = `./public/uploads/${filename}`;
      const productExists = await Product.findOne({ productName });
      
      if (productExists) {
        return res.status(422).json({ message: "Product already exists" });
      }
      
      const product = new Product({
        productName,
        description,
        price,
        pathImage,
        category
      });
      
      product.save();
      res.status(201).json({ message: "Product created" });
    } catch (error) {
      console.error(error);
  
      if (error instanceof z.ZodError) {
        const { message } = error.errors[0];
        return res.status(422).json({ message: `Validation Error: ${message}` });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateproduct = async (req, res) => {
    try {
        const {id , productName, description, price, category} = productUpdateSchema.parse(
            req.body
        );

        const product ={
            productName,
            description,
            price,
            category
        };
        
        await Product.findByIdAndUpdate(id, product);
        res.status(201).json({ message: "Product Updated" });

    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message: `Validation Error: ${message}` });
          }
          res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);
        res.status(201).json({ message: "Product Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
  getAllProducts,
  searchProduct,
  createProduct,
  updateproduct,
  deleteProduct
};
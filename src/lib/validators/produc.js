const { z } = require("zod");

const productSchema = z.object({
    productName: z.string(),
    description: z.string(),
    price: z.string(),
    category: z.string(),
  });

  const filterSchema = z.object({
    productName: z.string(),
    price: z.number(),
    category: z.string()
  })
  
  const productUpdateSchema = z.object({
    id: z.string(),
    productName: z.string(),
    description: z.string(),
    price: z.string(),
    category: z.string(),
  });
  
  const searchProductSchema = z.object({
    productName: z.string()
  });

  const deleteProductSchema = z.object({
    id: z.string()
  });

  module.exports = {
    productSchema,
    productUpdateSchema,
    searchProductSchema,
    deleteProductSchema,
    filterSchema
  };
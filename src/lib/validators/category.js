const { z } = require("zod");

const createCategorySchema = z.object({
    category: z.string()
  });
  
  const updateCategorySchema = z.object({
    id: z.string(),
    category: z.string()
  });

  const deleteCategorySchema = z.object({
    id: z.string()
  });

  module.exports = {
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
  };
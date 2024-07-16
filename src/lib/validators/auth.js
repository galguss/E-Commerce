const { z } = require("zod");

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
});

const userUpdateSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
});

const searchUserSchema = z.object({
  email: z.string()
});

const createCategorySchema = z.object({
  category: z.string()
});

const UpdateCategorySchema = z.object({
  id: z.string(),
  category: z.string()
});

const productSchema = z.object({
  productName: z.string(),
  description: z.string(),
  price: z.string(),
  category: z.string(),
});

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

module.exports = {
  signInSchema,
  signUpSchema,
  userUpdateSchema,
  searchUserSchema,
  createCategorySchema,
  UpdateCategorySchema,
  productSchema,
  productUpdateSchema,
  searchProductSchema
};

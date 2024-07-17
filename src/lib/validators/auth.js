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

module.exports = {
  signInSchema,
  signUpSchema
};

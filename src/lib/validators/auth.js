const { z } = require("zod");

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
});

module.exports = {
  signInSchema,
  signUpSchema,
};

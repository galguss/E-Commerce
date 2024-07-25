const { z } = require("zod");

const userUpdateSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
});
  
const searchUserSchema = z.object({
  address: z.string()
});

const upgradeSchema = z.object({
  id: z.string(),
});

module.exports = {
  userUpdateSchema,
  searchUserSchema,
  upgradeSchema
};
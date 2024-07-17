const { z } = require("zod");

const ordersSchema = z.object({
    userId: z.string(),
    productList: z.array(z.string()),
    total: z.number()

});

const searchOrdersSchema = z.object({
    userId: z.string()
});

module.exports = {
    ordersSchema,
    searchOrdersSchema
  };
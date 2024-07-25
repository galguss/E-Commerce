const { z } = require("zod");

const ordersSchema = z.object({
    userId: z.string(),
    productList: z.array(z.object({ product: z.string(), quantity: z.number()})),
    total: z.number()

});

const searchOrdersSchema = z.object({
    userId: z.string()
});

const ordersGroupBySchema = z.object({
    month: z.string(),
    year: z.string()
});

const orderConfirmationSchema = z.object({
    id: z.string(),
    status: z.string()
});

module.exports = {
    ordersSchema,
    searchOrdersSchema,
    ordersGroupBySchema,
    orderConfirmationSchema
  };
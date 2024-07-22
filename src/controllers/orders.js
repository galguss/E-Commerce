const Orders = require("../modules/Orders");
const { verifyToken } = require("../lib/utils");
const Product = require("../modules/Product");
const {
  ordersSchema,
  searchOrdersSchema,
} = require("../lib/validators/orders");
const { z } = require("zod");

const searchOrders = async (req, res) => {
  try {
    const { userId } = searchOrdersSchema.parse(req.params);

    const orders = await Orders.find({ userId });
    const products = await Product.find();

    if (!orders) {
      return res
        .status(200)
        .json({ message: "No previous purchases have been made" });
    }

    // join
    const enhancedOrders = orders.map((order) => {
      const enhancedProductList = order.productList
        .map((item) => {
          const product = products.find(
            (product) => product._id.toString() === item.product.toString()
          );
          if (product) {
            return {
              ...product,
              quantity: item.quantity,
            };
          }
          return undefined;
        })
        .filter((product) => product !== undefined);
    
      return {
        ...order,
        productList: enhancedProductList,
      };
    });

    res
      .status(200)
      .render("listOrders", {
        user: verifyToken(req.cookies.token),
        token: req.cookies.token,
        orders: enhancedOrders,
      });
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, productList, total } = ordersSchema.parse(req.body);
    
    const product = new Orders({
      userId,
      productList,
      date: new Date(),
      total,
    });
    product.save();
    res.status(201).json({ message: "order created" });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  searchOrders,
  createOrder,
};

const Orders = require("../modules/Orders");
const { ordersSchema, searchOrdersSchema } = require("../lib/validators/orders");
const { z } = require("zod");

const searchOrders = async (req, res) => {
    try {
        const { userId } =  searchOrdersSchema.parse(
          req.params
        );

        const orders = await Orders.find({ userId });

        if(!orders){
          return  res.status(200).json({ message: "No previous purchases have been made" });
        }

        res.status(200).json(orders);
        
    } catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
          const { message } = error.errors[0];
          return res.status(422).json({ message: `Validation Error: ${message}` });
        }

        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const createOrder = async (req, res) => {
    try {
      const { userId, productList, total } =ordersSchema.parse(
        req.body
      );
      
      let dateObj = new Date();
      let yyyy = dateObj.getFullYear();
      let mm = dateObj.getMonth() + 1;

      const product = new Orders({
        userId,
        productList,
        date:new Date(yyyy,mm),
        total
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
  createOrder
};
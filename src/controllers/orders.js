const Orders = require("../modules/Orders");
const { verifyToken } = require("../lib/utils");
const User = require("../modules/User");
const Product = require("../modules/Product");
const {
  ordersSchema,
  searchOrdersSchema,
  ordersGroupBySchema,
  orderConfirmationSchema
} = require("../lib/validators/orders");
const { z } = require("zod");

const ordersGroupBy = async (req, res) => {
  try {
    const { month, year } = ordersGroupBySchema.parse(req.params);
    
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    // יצירת תאריך התחלה ותאריך סוף עם פורמט תקני
    const startDate = new Date(yearNum, monthNum - 1);
    const endDate = new Date(yearNum, monthNum);

    console.log(`Start Date: ${startDate}`);
    console.log(`End Date: ${endDate}`);

    const groupBy = await Orders.aggregate([
      { $unwind: "$productList" },
      {
        $match: {
          date: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $addFields: {
          "productList.product": { $toObjectId: "$productList.product" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "productList.product",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: {
            productId: "$productList.product",
            productName: "$productDetails.productName",
            productPrice: "$productDetails.price"
          },
          totalQuantity: { $sum: "$productList.quantity" },
          totalRevenue: { $sum: { $multiply: ["$productList.quantity", "$productDetails.price"] } }
        }
      },
      {
        $project: {
          _id: 0,
          productId: "$_id.productId",
          productName: "$_id.productName",
          totalQuantity: 1,
          totalRevenue: 1
        }
      }
    ]);
    
    res.status(200).json(groupBy);
    
  } catch (error) {
      console.log(error);
    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getUserOrder = async (req, res) => {
  try {
    const { userId } = searchOrdersSchema.parse(req.body);
    const accounts = await User.find({ fullName:userId });
    const orders = await Orders.find({userId: accounts[0]._id});
    const products = await Product.find();

    if (!accounts) {
      return res
        .status(404)
        .json({ message: "User not found in the system" });
    }

    const enhancedOrders = orders.map((order) => {
      const enhancedProductList = order.productList
        .map((item) => {
          const product = products.find(
            (product) => product._id.toString() === item.product.toString()
          );
          if (product) {
            return {
              ...product._doc,
              quantity: item.quantity,
            };
          }
          return undefined;
        })
        .filter((product) => product !== undefined);

      const user = accounts.find(user => order.userId === user._id.toString());
      const userName = user ? user.fullName : 'Unknown User';

      return {
        ...order._doc,
        userId: userName,
        productList: enhancedProductList,
      };
    });

    res.status(200).json(enhancedOrders)
    
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
}

const filterForOrder = async (req, res) => {
  try {
    const { fullName, date, status } = req.body;
    const user = await User.findOne({ fullName }); 
    const userId = user ? user._id : null;

    const query = {};
    if (userId) query.userId = userId;

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      query.date = { $gte: startDate, $lte: endDate };
    } 
    if (status) query.status = status;

    const filter = await Orders.find(query);

    const products = await Product.find();
    const accounts = await User.find(); 

    const enhancedOrders = filter.map((order) => {
      const enhancedProductList = order.productList
        .map((item) => {
          const product = products.find(
            (product) => product._id.toString() === item.product.toString()
          );
          if (product) {
            return {
              ...product._doc, 
              quantity: item.quantity,
            };
          }
          return undefined;
        })
        .filter((product) => product !== undefined);

      const user = accounts.find(user => order.userId.toString() === user._id.toString());
      const userName = user ? user.fullName : 'Unknown User';

      return {
        ...order._doc, 
        userId: userName,
        productList: enhancedProductList,
      };
    });
    
    res.status(200).json(enhancedOrders);
    
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}

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
              ...product._doc,
              quantity: item.quantity,
            };
          }
          return undefined;
        })
        .filter((product) => product !== undefined);
    
      return {
        ...order._doc,
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

const orderConfirmation = async (req,res) => {
  try {
    const {status,id} = orderConfirmationSchema.parse(
      req.body
    );

    const order = {
      status
    };

    console.log(req.body);

    await Orders.findByIdAndUpdate(id, order);
    res.status(200).json({ message: "Order Upgraded" });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];
      return res.status(422).json({ message: `Validation Error: ${message}` });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  searchOrders,
  createOrder,
  ordersGroupBy,
  orderConfirmation,
  getUserOrder,
  filterForOrder
};

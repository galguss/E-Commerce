const Category = require("../modules/Category");
const Product = require("../modules/Product");
const User = require("../modules/User");
const Order = require("../modules/Orders");
const { verifyToken } = require("../lib/utils");


const showDashboard = async (req, res) => {
    const accounts = await User.find();
    const products = await Product.find();
    const categories = await Category.find();
    const orders = await Order.find();

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
  
        const user = accounts.find(user => order.userId === user._id.toString());
        const userName = user ? user.fullName : 'Unknown User';
  
        return {
          ...order._doc,
          userId: userName,
          productList: enhancedProductList,
        };
      });
      
    res.render('dashboard',{user: verifyToken(req.cookies.token), token: req.cookies.token, accounts, categories, orders: enhancedOrders});
}

const addProduct = async (req, res) => {
    const categories = await Category.find();
    res.render('productForm', {categories, product:{}});
}

const updateProduct = async (req, res) => {
    const categories = await Category.find();
    const product = await Product.findById(req.params.ID);
    res.render('productForm', {categories, product: product});
}



module.exports = {
    showDashboard,
    addProduct,
    updateProduct
};
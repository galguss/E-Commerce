const Product = require("../modules/Product");


const showShop = async (req, res) => {
    const products = await Product.find();
    res.render("index", {user: req.cookies.user, token: req.cookies.token, products});
}

const showCart = async (req, res) => {
    res.render("cart", {user: req.cookies.user, token: req.cookies.token});
}

module.exports = {
    showShop,
    showCart
};
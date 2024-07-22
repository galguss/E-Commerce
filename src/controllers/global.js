const Product = require("../modules/Product");
const { verifyToken } = require("../lib/utils");

const showShop = async (req, res) => {
    const products = await Product.find();
    res.render("index", {user: verifyToken(req.cookies.token), token: req.cookies.token, products});
}

const showCart = async (req, res) => {
    res.render("cart", {user: verifyToken(req.cookies.token), token: req.cookies.token});
}

module.exports = {
    showShop,
    showCart
};
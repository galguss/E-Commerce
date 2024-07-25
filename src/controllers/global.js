const Product = require("../modules/Product");
const Category = require("../modules/Category");
const { verifyToken } = require("../lib/utils");

const showShop = async (req, res) => {
    const products = await Product.find();
    const categories = await Category.find();
    res.render("index", {user: verifyToken(req.cookies.token), token: req.cookies.token, products, categories:[{}, ...categories]});
}

const showCart = async (req, res) => {
    res.render("cart", {user: verifyToken(req.cookies.token), token: req.cookies.token});
}

module.exports = {
    showShop,
    showCart
};
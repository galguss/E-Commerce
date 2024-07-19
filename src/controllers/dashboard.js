const Category = require("../modules/Category");
const Product = require("../modules/Product");
const User = require("../modules/User");


const showDashboard = async (req, res) => {
    const accounts = await User.find();
    const categories = await Category.find();
    res.render('dashboard',{user: req.cookies.user, token: req.cookies.token, accounts, categories});
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
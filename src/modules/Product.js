const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
    productName:{
        type: String,
        require: true,
        unique: true,
    },
    description:{
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    pathImage:{
        type: String,
        require: true,
    },
    category:{
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Products", ProductsSchema);
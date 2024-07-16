const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    category:{
        type: String,
        require: true,
        unique: true,
    }
});

module.exports = mongoose.model("Categories", CategorySchema);
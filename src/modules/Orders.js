const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    productList:{
        type:Array,
        require: true
    },
    date:{
        type:Date,
        require: true
    },
    total:{
        type: Number,
        require: true
    },
    status:{
        type: String,
        default: 'Awaiting confirmation',
        enum: ['Awaiting confirmation', 'confirmed', 'not confirmed'],
        require: true
    }
});

module.exports = mongoose.model("Orders", OrdersSchema);
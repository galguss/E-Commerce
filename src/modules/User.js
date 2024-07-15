const mongoose = require("mongoose");

// Define User schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN"],
  },
  address: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);

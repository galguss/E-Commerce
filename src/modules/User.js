const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    require: true,
    unique: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  fullName: {
    require: true,
    type: String,
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN"],
  },
  address: {
    require: true,
    type: String,
  },
  phoneNumber: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model("Users", UserSchema);

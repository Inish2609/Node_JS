const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Add The UserName"],
  },
  email: {
    type: String,
    required: [true, "Please Add The Email Address"],
    unique: [true, "Email Already Taken"],
  },
  password: {
    type: String,
    required: [true, "Please Add The Password"],
  },
});

module.exports = mongoose.model("User",userschema)
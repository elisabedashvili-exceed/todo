const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: String,
  password: String
});

let User = mongoose.model("User", userSchema);

exports.User = User;
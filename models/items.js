const mongoose = require("mongoose");

let todoItemsSchema = new mongoose.Schema({
  value: String,
  checked: Boolean
});

let Item = mongoose.model("Item", todoItemsSchema);

exports.Item = Item;
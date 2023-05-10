const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);

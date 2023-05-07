const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
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
   
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
    price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,

    required: true,
  },
 );

module.exports = mongoose.model("Drink", drinkSchema);

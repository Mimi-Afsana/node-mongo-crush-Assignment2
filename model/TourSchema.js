const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name at least 3 characters"],
      maxLength: [90, "max length 90 name is too longer"],
    },
    img: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can not be negative"],
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = new mongoose.model("Tour", schema);
module.exports = Tour;

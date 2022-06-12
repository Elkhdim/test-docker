const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id_User: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    max: 255,
    min: 6,
    required: true,
  },
  price: {
    type: String,
    max: 255,
    min: 6,
    required: true,
  },
  quantity: {
    type: String,
    max: 255,
    min: 6,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");
const PaintItemSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  product_id: {
    type: String
  },
  product_name: {
    type: String,
  },
  product_price: {
    type: Number,
  },
  product_status: {
    type: String,
  },
  dvt: {
    type: String,
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("PaintItem", PaintItemSchema);

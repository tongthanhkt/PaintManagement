const mongoose = require("mongoose");
const PaintItemSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  product_name: {
    type: String,
  },
  product_price: {
    type: String,
  },
  product_status: {
    type: String,
  },
  dvt: {
    type: String,
  },
  amount: {
    type: String,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("PaintItem", PaintItemSchema);

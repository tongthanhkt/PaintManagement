const mongoose = require("mongoose");
var PaintExportSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  total_export_price: Number,
  paint_export_items: [{}],
  phone_number: String,
  created_time: String,
  full_name: String,
  address: String
  
});
module.exports = mongoose.model("PaintExport", PaintExportSchema);

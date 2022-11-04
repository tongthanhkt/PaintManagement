const mongoose = require("mongoose");
var MaterialExportSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  total_export_price: Number,
  material_export_items: [{}],
  phone_number: String,
  created_time: String,
  full_name: String,
  address: String
  
});
module.exports = mongoose.model("MaterialExport", MaterialExportSchema);

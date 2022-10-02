const mongoose = require("mongoose");
var PaintExportSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  paint_export_items: [{}],
  created_time: String
});
module.exports = mongoose.model("PaintExport", PaintExportSchema);

const PaintItemSchema = require("../../models/PaintItem");
const PaintExportSchema = require("../../models/PaintExport");
exports.list = async function (req, res) {
  const products = await PaintItemSchema.find({});
  console.log(products);
  res.send(products);
};
exports.createPaintItem = async function (req, res) {
  try {
    let paintItem = new PaintItemSchema({
      id: Date.now(),
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_status: req.body.product_status,
      dvt: req.body.dvt,
      amount: req.body.amount,
      description: req.body.description,
    });
    const response = await PaintItemSchema.create(paintItem);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
  }
};
function checkExportItemValidation(paintExportItem, paintItems) {
  let result = false;
  paintItems.every((item) => {
    if (item.id == paintExportItem.id && paintExportItem.amount < item.amount) {
      console.log(item.id + " " + paintExportItem.id);
      console.log(paintExportItem.amount + " " + item.amount);
      result = true;
      return false;
    }
    return true;
  });
  return result;
}
exports.createPaintExport = async function (req, res) {
  try {
    const paintItems = await PaintItemSchema.find({});
    const paintExportItems = req.body.paint_export_items;
    paintExportItems.forEach((paintExportItem) => {
      if (!checkExportItemValidation(paintExportItem, paintItems)) {
        res
          .status(401)
          .json({ mess: `Product id:${paintExportItem.id} khong hop le` });
        return;
      }
    });

    for (let i = 0; i < paintExportItems.length; i++) {
      for (let j = 0; j < paintItems.length; j++) {
        if (paintExportItems[i].id === paintItems[j].id) {
          await PaintItemSchema.findOneAndUpdate(
            { id: paintExportItems[i].id },
            { amount: paintItems[j].amount - paintExportItems[i].amount }
          );
        }
      }
    }
    paintExportItems.forEach((paintExportItem) => {
      paintExportItem.total_price =
        paintExportItem.amount * paintExportItem.product_price;
    });
    let paintExport = new PaintExportSchema({
      id: Date.now(),
      paint_export_items: paintExportItems,
      created_time: new Date().toLocaleString(),
    });
    const response = await PaintExportSchema.create(paintExport);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
  }
};

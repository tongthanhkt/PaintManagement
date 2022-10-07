const PaintItemSchema = require("../../models/PaintItem");
const PaintExportSchema = require("../../models/PaintExport");
exports.listPaintItem = async function (req, res) {
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
    if (
      paintItem.product_price === undefined ||
      typeof paintItem.product_price !== "number" ||
      paintItem.amount === undefined ||
      typeof paintItem.amount !== "number" ||
      paintItem.dvt.length === 0 ||
      paintItem.product_name === 0
    ) {
      res
        .status(400)
        .json({ mess: "Khong duoc bo trong price, amount, name hoac dvt" });
      return;
    }
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
    if(req.body.paint_export_items===undefined) {
      res
          .status(401)
          .json({ mess: `Xuất sản phẩm có không hợp lệ` });
    }
    const isValid = paintExportItems.every((paintExportItem) => {
      if (!checkExportItemValidation(paintExportItem, paintItems)) {
        res
          .status(401)
          .json({ mess: `Xuất sản phẩm có id:${paintExportItem.id} không hợp lệ` });
        return false;
      } else return true;
    });
    if(isValid){
      let totalExportPrice = 0 ; 
      for (let i = 0; i < paintExportItems.length; i++) {
        for (let j = 0; j < paintItems.length; j++) {
          if (paintExportItems[i].id === paintItems[j].id) {
            
            await PaintItemSchema.findOneAndUpdate(
              { id: paintExportItems[i].id },
              { amount: paintItems[j].amount - paintExportItems[i].amount }
            );
            paintExportItems[i].product_name = paintItems[j].product_name;
            paintExportItems[i].product_price = paintItems[j].product_price;
            paintExportItems[i].dvt = paintItems[j].dvt;
            paintExportItems[i].total_price =
              paintExportItems[i].product_price * paintExportItems[i].amount;
              totalExportPrice += paintExportItems[i].total_price
          }
        }
      }
      let paintExport = new PaintExportSchema({
        id: Date.now(),
        paint_export_items: paintExportItems,
        created_time: new Date().toLocaleString(),
        total_export_price: totalExportPrice,
        phone_number: req.body.phone_number,
        full_name: req.body.full_name
      });
      const response = await PaintExportSchema.create(paintExport);
      res.status(201).json({ response });
    } else {
      res.status(401).json({ messs: "Gửi dữ liệu không hợp lệ" });
    }

  } catch (error) {
    console.log(error);
  }
};
exports.listPaintExport = async function (req, res) {
  const response = await PaintExportSchema.find({})
  res.status(200).json({response})
}
exports.detailPaintExport = async function (req, res) {
  console.log(req.params.id);
  const response = await PaintExportSchema.findOne({
    id: req.params.id
  })
  res.status(200).json({response});
}
exports.detailPaintItem = async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const response = await PaintItemSchema.find({id: id});
  res.status(200).json({response});;
}
exports.updatePaintItem = async function (req, res) {
  
  const filter = req.params;
  const update = req.body;
  console.log(filter)
  const response = await PaintItemSchema.findOneAndUpdate(filter, update);
  res.status(200).json({response});
}

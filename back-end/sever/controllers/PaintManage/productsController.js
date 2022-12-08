const PaintItemSchema = require("../../models/PaintItem");
const PaintExportSchema = require("../../models/PaintExport");
exports.listPaintItem = async function (req, res) {
  const products = await PaintItemSchema.find({});
  res.send(products);
};
exports.createPaintItem = async function (req, res) {
  let paintItem = new PaintItemSchema({
    id: req.body.id,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
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
      .json({ error: "Nhập sản phầm không hợp lệ" });
    return;
  }
  try {
    const response = await PaintItemSchema.create(paintItem);
    res.status(201).json({ response });
  } catch (error) {
    res.status(400).json({mess: "Lỗi không thể xử lí ở server"})
  }
};
function checkExportItemValidation(paintExportItem, paintItems) {
  let result = false;
  paintItems.every((item) => {
    if (item.id == paintExportItem.id && paintExportItem.amount <= item.amount) {
      result = true;
      return false;
    }
    return true;
  });
  return result;
}
exports.createPaintExport = async function (req, res) {
    const paintItems = await PaintItemSchema.find({});
    const paintExportItems = req.body.paint_export_items;
    if(req.body.paint_export_items===undefined || req.body.paint_export_items.length === 0) {
      res
          .status(401)
          .json({ error: 'Định dạng không hợp lệ' });
          return
    }
    const isValid = paintExportItems.every((paintExportItem) => {
      if (!checkExportItemValidation(paintExportItem, paintItems)) {
        return false;
      } else return true;
    });
    if(!isValid){
      res.status(400).json({error: "Xuất sản phẩm không hợp lệ"})
    }
    else {
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
          if(paintItems[j].amount - paintExportItems[i].amount === 0) {
            const id = paintItems[j].id;
            const filter = {id: id}
            const response = await PaintItemSchema.deleteOne(filter);
            
          }
        }
      }
      let paintExport = new PaintExportSchema({
        id: Date.now(),
        paint_export_items: paintExportItems,
        created_time: new Date().toLocaleString(),
        total_export_price: totalExportPrice - (req.body.discount||0),
        phone_number: req.body.phone_number,
        full_name: req.body.full_name,
        address: req.body.address
      });
      try {
        const response = await PaintExportSchema.create(paintExport);
        res.status(201).json({ response });
      } catch (error) {
        res.status(400).json({error: "Lỗi không thể xử lí ở sever"})
      }
      
    } 

  
};
function updateProductItem(){

}
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
  res.status(200).json({response});
}
exports.updatePaintItem = async function (req, res) {
  
  const filter = req.params;
  const update = req.body;
  try {
    const response = await PaintItemSchema.findOneAndUpdate(filter, update);
  res.status(200).json({response});
  } catch (error) {
    res.status(400).json({error: "Lỗi phía sever không thể xử lí !!"})
  }
  
}
exports.deletePaintItems = async function (req, res) {
  const id = req.params.id;
  const filter = {id: id}
  const response = await PaintItemSchema.deleteOne(filter);
  if(response.deletedCount !== 0 ) {
    res.status(200).json({success: "Xoá thành công"})
  } else {
    res.status(400).json({error: "Xoá không thành công "})
  }
}
exports.deletePaintExport = async function (req, res) {
  const id = req.params.id;
  const filter = {_id: id};
  const response = await PaintExportSchema.deleteOne(filter);
  if(response.deletedCount !== 0 ) {
    res.status(200).json({success: "Xoá thành công"})
  } else {
    res.status(400).json({error: "Xoá không thành công "})
  }
}
exports.incomeCustomer = async function (req, res) {
  const phoneNumber = req.params.phone_number;
  const listPaintExport = await PaintExportSchema.find({});
  console.log(phoneNumber)
  const customerPaintExport = listPaintExport.filter(paintExport => 
    paintExport.phone_number === phoneNumber
  )
  if(customerPaintExport.length === 0) res.status(400).json({error: `Không tồn tại hóa đơn của khách hàng ${phoneNumber}`})
  else {
    let totalIncomeCustomer = 0
    customerPaintExport.forEach(paintExport => totalIncomeCustomer += paintExport.total_export_price )
    res.status(200).json({customerPaintExport, phone_number: phoneNumber, full_name: customerPaintExport[0].full_name || '', address: customerPaintExport[0].address, total_income_customer: totalIncomeCustomer })
    }
  }
  
  
exports.statisticalIncome = async function (req, res ){ 
  console.log(req.body)
  const fromDate =BigInt(req.body.from_date);
  const toDate = BigInt(req.body.to_date);
  const listPaintExport = await PaintExportSchema.find({});
  const listStatisticalExport =  listPaintExport.filter(paintExport=>{
    const create_time = new Date(paintExport.created_time)
    if(create_time >= fromDate && create_time <= toDate ){
      return true
    }
  })
  let totalStatisticalExport = 0;
  if(listStatisticalExport.length == 0) res.status(400).json({error: 'Không tồn tại hóa đơn trong thời gian này'})
  else {
    listStatisticalExport.forEach(statisticalExport => totalStatisticalExport += statisticalExport.total_export_price)
    res.status(200).json({listStatisticalExport, total_statistical_export :totalStatisticalExport })
  }
  

}
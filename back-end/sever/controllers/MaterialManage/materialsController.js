const MaterialItemSchema = require("../../models/MaterialItem");
const MaterialExportSchema = require("../../models/MaterialExport");
exports.listMaterialItem = async function (req, res) {
  const products = await MaterialItemSchema.find({});
  res.send(products);
};
exports.createMaterialItem = async function (req, res) {
  let materialItem = new MaterialItemSchema({
    id: Date.now(),
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    dvt: req.body.dvt,
    amount: req.body.amount,
    description: req.body.description,
  });
  if (
    materialItem.product_price === undefined ||
    typeof materialItem.product_price !== "number" ||
    materialItem.amount === undefined ||
    typeof materialItem.amount !== "number" ||
    materialItem.dvt.length === 0 ||
    materialItem.product_name === 0
  ) {
    res
      .status(400)
      .json({ error: "Nhập sản phầm không hợp lệ" });
    return;
  }
  try {
    const response = await MaterialItemSchema.create(materialItem);
    res.status(201).json({ response });
  } catch (error) {
    res.status(400).json({mess: "Lỗi không thể xử lí ở server"})
  }
};
function checkExportItemValidation(materialExportItem, materialItems) {
  let result = false;
  materialItems.every((item) => {
    if (item.id == materialExportItem.id && materialExportItem.amount <= item.amount) {
      result = true;
      return false;
    }
    return true;
  });
  return result;
}
exports.createMaterialExport = async function (req, res) {
    const materialItems = await MaterialItemSchema.find({});
    const materialExportItems = req.body.material_export_items;
    if(req.body.material_export_items===undefined || req.body.material_export_items.length === 0) {
      res
          .status(401)
          .json({ error: 'Định dạng không hợp lệ' });
          return
    }
    const isValid = materialExportItems.every((materialExportItem) => {
      if (!checkExportItemValidation(materialExportItem, materialItems)) {
        return false;
      } else return true;
    });
    if(!isValid){
      res.status(400).json({error: "Xuất sản phẩm không hợp lệ"})
    }
    else {
      let totalExportPrice = 0 ; 
      for (let i = 0; i < materialExportItems.length; i++) {
        for (let j = 0; j < materialItems.length; j++) {
          if (materialExportItems[i].id === materialItems[j].id) {
            
            await MaterialItemSchema.findOneAndUpdate(
              { id: materialExportItems[i].id },
              { amount: materialItems[j].amount - materialExportItems[i].amount }
            );
            materialExportItems[i].product_id = materialItems[j].product_id;
            materialExportItems[i].product_name = materialItems[j].product_name;
            materialExportItems[i].product_price = materialItems[j].product_price;
            materialExportItems[i].dvt = materialItems[j].dvt;
            materialExportItems[i].description = materialItems[j].description;
            materialExportItems[i].total_price =
              materialExportItems[i].product_price * materialExportItems[i].amount;
              totalExportPrice += materialExportItems[i].total_price
          }
        }
      }
      let materialExport = new MaterialExportSchema({
        id: Date.now(),
        material_export_items: materialExportItems,
        created_time: new Date().toLocaleString(),
        total_export_price: totalExportPrice - (req.body.discount||0),
        phone_number: req.body.phone_number,
        full_name: req.body.full_name,
        address: req.body.address
      });
      try {
        const response = await MaterialExportSchema.create(materialExport);
        res.status(201).json({ response });
      } catch (error) {
        res.status(400).json({error: "Lỗi không thể xử lí ở sever"})
      }
      
    } 

  
};
function updateProductItem(){

}
exports.listMaterialExport = async function (req, res) {
  const response = await MaterialExportSchema.find({})
  res.status(200).json({response})
}
exports.detailMaterialExport = async function (req, res) {
  console.log(req.params.id);
  const response = await MaterialExportSchema.findOne({
    id: req.params.id
  })
  res.status(200).json({response});
}
exports.detailMaterialItem = async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const response = await MaterialItemSchema.find({id: id});
  res.status(200).json({response});
}
exports.updateMaterialItem = async function (req, res) {
  
  const filter = req.params;
  const update = req.body;
  try {
    const response = await MaterialItemSchema.findOneAndUpdate(filter, update);
  res.status(200).json({response});
  } catch (error) {
    res.status(400).json({error: "Lỗi phía sever không thể xử lí !!"})
  }
  
}
exports.deleteMaterialItems = async function (req, res) {
  const id = req.params.id;
  const filter = {id: id}
  const response = await MaterialItemSchema.deleteOne(filter);
  if(response.deletedCount !== 0 ) {
    res.status(200).json({success: "Xoá thành công"})
  } else {
    res.status(400).json({error: "Xoá không thành công "})
  }
}
exports.deleteMaterialExport = async function (req, res) {
  const id = req.params.id;
  const filter = {_id: id};
  const response = await MaterialExportSchema.deleteOne(filter);
  if(response.deletedCount !== 0 ) {
    res.status(200).json({success: "Xoá thành công"})
  } else {
    res.status(400).json({error: "Xoá không thành công "})
  }
}
exports.incomeCustomer = async function (req, res) {
  const phoneNumber = req.params.phone_number;
  const listMaterialExport = await MaterialExportSchema.find({});
  console.log(phoneNumber)
  const customerMaterialExport = listMaterialExport.filter(materialExport => 
    materialExport.phone_number === phoneNumber
  )
  if(customerMaterialExport.length === 0) res.status(400).json({error: `Không tồn tại hóa đơn của khách hàng ${phoneNumber}`})
  else {
    let totalIncomeCustomer = 0
    customerMaterialExport.forEach(materialExport => totalIncomeCustomer += materialExport.total_export_price )
    res.status(200).json({customerMaterialExport, phone_number: phoneNumber, full_name: customerMaterialExport[0].full_name || '', address: customerMaterialExport[0].address, total_income_customer: totalIncomeCustomer })
    }
  }
  
  
exports.statisticalIncome = async function (req, res ){ 
  console.log(req.body)
  const fromDate =BigInt(req.body.from_date);
  const toDate = BigInt(req.body.to_date);
  const listMaterialExport = await MaterialExportSchema.find({});
  const listStatisticalExport =  listMaterialExport.filter(materialExport=>{
    const create_time = new Date(materialExport.created_time)
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
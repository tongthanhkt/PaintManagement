const Products = require('../../models/Products')
exports.list = async function(req, res) {
    const products =  await Products.find({}).lean().limit(100)
    res.send(products)
}
exports.create = async function(req, res) {
    try {
        console.log(req.body)
        const product = await Products.create(req.body);
        res.status(201).json({product})
    } catch(error) {
        res.status(500).json({mes: error})
    }
}
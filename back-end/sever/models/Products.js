const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    id: {
        type: String,
    },
    nameProduct:{
        type: String,
    },
    priceProduct: {
        type: String,
    },
    totalProduct: {
        type: String,
    },
    statusProduct: {
        type: String,
    },
    dvt: {
        type: String
    },
    description: {
        type: String
    }
})
module.exports = mongoose.model('Products' , ProductSchema);
const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    nameProduct:{
        type: String,
    },
    priceProduct: {
        type: String,

    }
})
module.exports = mongoose.model('Products' , ProductSchema);
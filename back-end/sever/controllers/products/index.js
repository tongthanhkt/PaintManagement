const express = require('express')
const router = express.Router()
const productsController = require('./productsController')
router.get('/', productsController.list);
router.post('/create', productsController.create);
module.exports = router
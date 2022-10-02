const express = require("express");
const router = express.Router();
const productsController = require("./productsController");
router.get("/", productsController.list);
router.post("/create-paint-item", productsController.createPaintItem);
router.post("/create-paint-export",productsController.createPaintExport);
module.exports = router;

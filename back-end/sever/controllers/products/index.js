const express = require("express");
const router = express.Router();
const productsController = require("./productsController");
router.get("/", productsController.listPaintItem);
router.post("/create-paint-item", productsController.createPaintItem);
router.post("/create-paint-export", productsController.createPaintExport);
router.get("/list-paint-export", productsController.listPaintExport);
router.get("/detail-paint-export", productsController.detailPaintExport);
module.exports = router;

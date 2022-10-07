const express = require("express");
const router = express.Router();
const productsController = require("./productsController");
router.get("/", productsController.listPaintItem);
router.post("/create-paint-item", productsController.createPaintItem);
router.get("/detail-paint-item", productsController.detailPaintItem);
router.post("/create-paint-export", productsController.createPaintExport);
router.get("/list-paint-export", productsController.listPaintExport);
router.get("/detail-paint-item/:id", productsController.detailPaintItem);
router.put("/update-paint-item/:id", productsController.updatePaintItem);
router.get("/detail-paint-export/:id", productsController.detailPaintExport);

module.exports = router;

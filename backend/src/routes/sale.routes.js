const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");
const saleMiddleware = require("../middlewares/saleMiddeware");

// Definição das rotas e vinculação com os métodos do controller
router.post("/",saleMiddleware.createValidation, saleController.createSale);
router.get("/", saleController.getSales);
router.get("/:id", saleController.getSaleById);
router.put("/:id", saleController.updateSale);
router.delete("/:id", saleController.deleteSale);

module.exports = router;

const express = require("express");
const router = express.Router();
const uploadImage = require("../config/uploadImage");
const productController = require("../controllers/productController");
const productMiddleware = require("../middlewares/productMiddleware");

// Definição das rotas e vinculação com os métodos do controller
router.post("/", uploadImage.single("image"), productMiddleware.createValidation, productController.createProduct);
router.get("/", productController.getProducts);
router.put("/:id", uploadImage.single("image"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

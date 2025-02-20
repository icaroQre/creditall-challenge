const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const clientMiddeware = require('../middlewares/clientMiddleware');

// Definição das rotas
router.post("/", clientMiddeware.createValidation, clientController.createClient);
router.get("/", clientController.getClients);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;

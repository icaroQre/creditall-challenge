const Client = require('../models/Client');
const Product = require('../models/Product');

exports.createValidation = async (req, res, next) => {
    try {
        const { clientId, productId, quantity, discount, status, saleDate } = req.body;

        if (!clientId || !productId || !quantity || !status || !saleDate) {
            return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
        }

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ error: "A quantidade deve ser um número positivo" });
        }

        const validStatuses = ["completed", "pending", "canceled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Status inválido. Os valores permitidos são: completed, pending, canceled" });
        }

        if (isNaN(Date.parse(saleDate))) {
            return res.status(400).json({ error: "Data de venda inválida" });
        }

        const client = await Client.findByPk(clientId);
        const product = await Product.findByPk(productId);
        if (!client || !product) {
            return res.status(404).json({ error: "Cliente ou produto não encontrado" });
        }

        next();
    } catch (error) {
        console.error("Erro na validação:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
};

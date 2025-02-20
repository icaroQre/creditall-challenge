const Sale = require("../models/Sale");
const Client = require("../models/Client");
const Product = require("../models/Product");

// Cadastrar uma nova venda
exports.createSale = async (req, res) => {
    const { clientId, productId, quantity, discount, status, saleDate } = req.body;

    try {
        const sale = await Sale.create({ clientId, productId, quantity, discount, status, saleDate });
        return res.status(201).json(sale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Buscar todas as vendas
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [
                {
                    model: Client,
                    as: "client",
                    attributes: ["name", "email", "cpf"]
                },
                {
                    model: Product,
                    as: "product",
                    attributes: ["name", "description", "price"]
                }
            ]
        });
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Buscar uma venda por ID
exports.getSaleById = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await Sale.findByPk(id, {
            include: [
                {
                    model: Client,
                    as: "client",
                    attributes: ["name", "email", "cpf"]
                },
                {
                    model: Product,
                    as: "product",
                    attributes: ["name", "description", "price"]
                }
            ]
        });

        if (!sale) {
            return res.status(404).json({ error: "Venda não encontrada" });
        }
        return res.status(200).json(sale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Atualizar uma venda
exports.updateSale = async (req, res) => {
    const { id } = req.params;
    const { clientId, productId, quantity, discount, status, saleDate } = req.body;

    try {
        const sale = await Sale.findByPk(id);
        if (!sale) {
            return res.status(404).json({ error: "Venda não encontrada" });
        }

        // Atualizar os dados da venda
        if (clientId) sale.clientId = clientId;
        if (productId) sale.productId = productId;
        if (quantity) sale.quantity = quantity;
        if (discount) sale.discount = discount;
        if (status && status == 'completed' || 'pending' || 'canceled'){
            sale.status = status;
        }
        if (saleDate) sale.saleDate = saleDate;
 
        await sale.save();
        return res.status(200).json(sale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Deletar uma venda
exports.deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await Sale.findByPk(id);
        if (!sale) {
            return res.status(404).json({ error: "Venda não encontrada" });
        }

        await sale.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

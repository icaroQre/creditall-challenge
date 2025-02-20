const Product = require("../models/Product");

// Cadastrar um novo produto
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        const product = await Product.create({ name, description, price, image });
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Buscar todos os produtos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Atualizar um produto
exports.updateProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.image = req.file ? req.file.filename : product.image;
        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Deletar um produto
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        await product.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");

// Cadastrar um novo produto
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

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
    try {
        const { name, description, price } = req.body;
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        // Se houver um novo arquivo de imagem, exclua o antigo antes de atualizar
        if (req.file) {
            if (product.image) {
                const oldImagePath = path.join(__dirname, "..", "uploads", product.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            product.image = req.file.filename;
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;

        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Deletar um produto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        // Remover imagem associada ao produto
        if (product.image) {
            const imagePath = path.join(__dirname, "..", "uploads", product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await product.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

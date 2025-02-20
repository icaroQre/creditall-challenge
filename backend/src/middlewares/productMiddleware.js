exports.createValidation = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;

        req.body.name = name.trim();
        req.body.description = description.trim();

        if (!name || !description) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
        if (!price) {
            return res.status(400).json({ error: "O preço deve conter um valor válido" });
        }

        if (name.length < 3 || name.length > 100) {
            return res.status(400).json({ error: "O nome deve ter entre 3 e 100 caracteres" });
        }

        if (description.length < 5 || description.length > 500) {
            return res.status(400).json({ error: "A descrição deve ter entre 10 e 500 caracteres" });
        }

        if (isNaN(price) || price <= 0 || !/^\d+(\.\d{1,2})?$/.test(price.toString())) {
            return res.status(400).json({ error: "O preço deve ser um número positivo com até duas casas decimais" });
        }

        next();
    } catch (error) {
        console.error("Erro na validação:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
};

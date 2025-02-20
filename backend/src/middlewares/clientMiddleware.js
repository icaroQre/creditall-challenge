const Client  = require('../models/Client');

exports.createValidation = async (req, res, next) => {
    const { name, email, cpf } = req.body;

    if (!name || !email || !cpf) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const emailExist = await Client.findOne({
            where: {
                email: email.trim(),
            },
        });

        const cpfExist = await Client.findOne({
            where: {
                cpf: cpf.trim(),
            },
        });

        if (emailExist || cpfExist) {
            return res.status(400).json({ error: "E-mail ou CPF já cadastrados" });
        }

        next();

    } catch (error) {
        console.error("Erro ao verificar unicidade dos dados:", error);
        return res.status(500).json({ error: "Erro interno no servidor", details: error.message });
    }
};

const Client  = require('../models/Client'); // Certifique-se de que o caminho para 'models' está correto

exports.createValidation = async (req, res, next) => {
    const { name, email, cpf } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !cpf) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        // Verifica se já existe um cliente com o mesmo e-mail ou CPF
        const emailExist = await Client.findOne({
            where: {
                email: email,
            },
        });

        const cpfExist = await Client.findOne({
            where: {
                cpf: cpf,
            },
        });

        if (emailExist || cpfExist) {
            return res.status(400).json({ error: "E-mail ou CPF já cadastrados" });
        }

        next(); // Se estiver tudo certo, continua para o próximo middleware ou controller
    } catch (error) {
        console.error("Erro ao verificar unicidade dos dados:", error);
        return res.status(500).json({ error: "Erro interno no servidor", details: error.message });
    }
};

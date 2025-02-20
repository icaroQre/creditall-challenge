const Client = require("../models/Client");

exports.createClient = async (req, res) => {
    const { name, email, cpf } = req.body;
    try {
        const client = await Client.create({ name, email, cpf });
        return res.status(201).json(client);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateClient = async (req, res) => {
    const { name, email, cpf } = req.body;
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        if(name) client.name = name;
        if(email) client.email = email;
        if(cpf) client.cpf = cpf;
        await client.save();
        return res.status(200).json(client);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: "Cliente não encontrado" });
        }
        await client.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

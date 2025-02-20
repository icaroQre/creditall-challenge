const app = require('./app');
const sequelize = require('./config/database');
1
const PORT = 8080;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco de dados com sucesso.');

        await sequelize.sync({ force: false });
        console.log('Tabelas sincronizadas com sucesso.');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados: ', error);
    }
})();

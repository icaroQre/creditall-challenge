const express = require("express");
const path = require("path");
const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 8080; // Usa variável de ambiente se disponível

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

(async () => {
  try {
    console.log("🔄 Tentando conectar ao banco de dados...");
    await sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados com sucesso.");

    console.log("🔄 Sincronizando tabelas...");
    await sequelize.sync({ force: false });
    console.log("✅ Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  } finally {
    // Inicia o servidor, mesmo que o banco não conecte
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  }
})();

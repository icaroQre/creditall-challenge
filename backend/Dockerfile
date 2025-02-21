# Use a imagem oficial do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do backend
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Exponha a porta que o backend usa
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]

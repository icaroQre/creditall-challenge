# Use a imagem oficial do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do frontend
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Exponha a porta que o frontend usa
EXPOSE 3000

# Comando para rodar o frontend
CMD ["npm", "run", "start"]

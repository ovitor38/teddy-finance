FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR ./

# Copia o arquivo de pacotes para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o diretório de trabalho
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta da aplicação (caso esteja rodando na porta 3000, por exemplo)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"]

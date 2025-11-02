FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# (Kita akan tambahkan expose port nanti di docker-compose)
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node src/index.js"]
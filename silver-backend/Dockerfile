FROM node:20-alpine

LABEL authors="Thiago"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
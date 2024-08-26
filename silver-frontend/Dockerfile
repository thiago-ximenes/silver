FROM node:20-alpine

LABEL authors="Thiago"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "start"]
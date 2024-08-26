FROM ubuntu:latest
LABEL authors="Thiago"

FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
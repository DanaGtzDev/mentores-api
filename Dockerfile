FROM node:24-slim

ARG BASE_ID
ENV BASE_ID=$BASE_ID

ARG IN_TABLE_NAME
ENV IN_TABLE_NAME=$IN_TABLE_NAME

ARG OUT_TABLE_NAME
ENV OUT_TABLE_NAME=$OUT_TABLE_NAME

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
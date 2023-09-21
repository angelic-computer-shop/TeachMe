
FROM node:16.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4500

CMD [ "node", "index.js" ]




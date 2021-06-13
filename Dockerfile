FROM node:16-alpine3.11

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app/model/bot.js" ]
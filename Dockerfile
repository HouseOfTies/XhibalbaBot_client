FROM node:14.18.0-alpine3.14 as base
WORKDIR /
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000

# Production job
FROM base as production
ENV NODE_PATH = ./build
RUN npm run build
CMD ["npm", "run", "start"]

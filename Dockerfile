FROM node:16 as base
RUN apt-get update -y
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y
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

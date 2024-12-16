FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./


RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node","dist/src/main.js"]



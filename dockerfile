FROM node:16.13.0

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["npm", "start"]
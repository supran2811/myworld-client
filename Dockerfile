
FROM node:8

RUN mkdir -p /myworld-client

WORKDIR /myworld-client

COPY  package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start-prod
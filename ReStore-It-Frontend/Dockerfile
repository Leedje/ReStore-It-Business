FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4300

EXPOSE 4300

CMD [ "npm", "start" ]

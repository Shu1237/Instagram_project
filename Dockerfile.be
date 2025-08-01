FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force


COPY ./backend ./backend



WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "start"]
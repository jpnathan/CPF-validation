FROM node:8

RUN mkdir /var/www
WORKDIR /var/www

RUN npm install pm2@latest -g
RUN npm intall
RUN pm2 start index.js
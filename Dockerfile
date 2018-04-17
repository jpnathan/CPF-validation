FROM node:8

WORKDIR /var/www
COPY package*.json ./
RUN npm install pm2 -g
CMD ["pm2-runtime", "index.js"]
RUN npm install
COPY . .
RUN pm2 start index.js && /bin/bash
FROM node:10
EXPOSE 8080

WORKDIR /app

COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .
CMD [ "node", "./build/server.js" ]
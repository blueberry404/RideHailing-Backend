FROM node:10
EXPOSE 3000
EXPOSE 6379

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

ADD . /app

# Compile all typescript to javascript
RUN npm run tsc

# If you are building your code for production
# RUN npm ci --only=production

CMD [ "node", "./build/server.js" ]
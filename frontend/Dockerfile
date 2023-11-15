FROM node:18.16.0-alpine3.17

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
COPY . .

EXPOSE 3100

CMD yarn dev




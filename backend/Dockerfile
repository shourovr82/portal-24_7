FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY package.json yarn.lock ./

# COPY
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./


RUN yarn install

# Generate prisma client
RUN npx prisma generate


COPY . .

EXPOSE 7000


CMD yarn dev
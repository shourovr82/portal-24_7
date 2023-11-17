FROM node:18.16.0-alpine3.17

# set the working directory
WORKDIR /app

# copy dependencies file
COPY package.json yarn.lock ./

# COPY prisma directory
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install dependencies
RUN yarn install

# Generate prisma client
RUN npx prisma generate

# Copy everything 
COPY . .

EXPOSE 7000


RUN yarn build
# run the project
CMD yarn startmigrate

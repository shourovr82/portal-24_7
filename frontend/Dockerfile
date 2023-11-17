# FROM node:18.16.0-alpine3.17

# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install 
# COPY . .

# EXPOSE 3100

# CMD yarn dev



# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build     
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
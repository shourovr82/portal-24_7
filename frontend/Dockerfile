FROM node:18.3.0-alpine3.14

# Create app directory
WORKDIR /app

COPY . .

RUN yarn install 


EXPOSE 3100

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["sh", "./entrypoint.sh"]

CMD yarn dev




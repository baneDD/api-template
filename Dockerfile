FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
    then \
    npm install; \
    else \
    npm install --production; \
    fi;

COPY . .

EXPOSE 3000

CMD if [ "$NODE_ENV" = "development" ]; \
    then npm run start:dev; \
    else npm run start; \
    fi;
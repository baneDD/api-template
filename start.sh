#!/bin/sh

if [ "$NODE_ENV" = "development" ]; 
    then 
        echo "Running in DEVELOPMENT mode";
        npm run start:dev; 
    else 
        echo "Running in PRODUCTION mode"
        npm run start; 
fi;
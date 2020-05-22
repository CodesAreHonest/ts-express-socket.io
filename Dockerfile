FROM node:lts-alpine

## Create App Directory
WORKDIR /usr/src/app

## copy package, tsconfig
COPY package*.json ./
COPY tsconfig*.json ./

## build node_modules/
RUN npm ci

## copy src files 
COPY . . 

## bind the app to port 8080 mapped by the docker daemon 
EXPOSE 8080

## define the runtime 
CMD ["npm", "run", "dev"]
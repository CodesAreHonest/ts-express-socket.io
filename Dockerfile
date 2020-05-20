FROM node:lts-alpine

## Create App Directory
WORKDIR /usr/src/app

## copy package, tsconfig
COPY package*.json .
COPY tsconfig*.json .
COPY . . 

## build node_modules/
RUN npm ci --quiet
RUN npm run build 

## copy src files 
COPY /dist ./ 

## bind the app to port 8080 mapped by the docker daemon 
EXPOSE 8080

## define the runtime 
CMD ["npm", "run", "prod"]
FROM node:12 AS builder
ENV NODE_ENV default
WORKDIR /usr/src/journal_vtex
COPY ["ormconfig.json*","package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
RUN mv node_modules ../
COPY . .
EXPOSE 5051
CMD npm start
FROM node:14-alpine AS builder
ENV NODE_ENV default
WORKDIR /usr/src/journal_vtex/
COPY package*.json ./
COPY ormconfig*.json ./
RUN npm install
RUN npm install reflect-metadata 
COPY . .
EXPOSE 5052
CMD npm run start
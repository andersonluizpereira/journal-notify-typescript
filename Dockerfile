FROM node:14-alpine AS builder
ENV NODE_ENV production
WORKDIR /usr/src/journal_vtex/
COPY package*.json ./
COPY ormconfig*.json ./
RUN npm install
RUN npm install reflect-metadata 
COPY ./dist/ .
EXPOSE 5051
CMD npm run start
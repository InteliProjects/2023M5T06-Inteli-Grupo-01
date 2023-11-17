# Etapa de compilação
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

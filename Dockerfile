FROM node:20.1.0 AS builder
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm i
COPY . .
RUN npm run build -- --configuration development
FROM nginx:1.25-alpine
COPY --from=builder ./app/dist/spotrx /usr/share/nginx/html

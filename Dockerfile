
FROM ubuntu/apache2:2.4-23.04_edge AS base
EXPOSE 80

FROM node:20.14.0-alpine AS build
WORKDIR /react
COPY . .
RUN npm install
RUN npm run build

FROM base AS final
RUN a2enmod rewrite

WORKDIR /etc/apache2/sites-available
COPY ./apache.conf ./000-default.conf

WORKDIR /var/www/html
COPY --from=build /react/dist .
COPY ./.htaccess .
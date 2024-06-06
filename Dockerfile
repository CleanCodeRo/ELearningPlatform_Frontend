
FROM httpd:2.4 AS base
EXPOSE 80

FROM node:20.14.0-alpine AS build
WORKDIR /react
COPY . .
RUN npm install
RUN npm run build

FROM base AS final
WORKDIR ./htdocs
COPY --from=build /react/dist .
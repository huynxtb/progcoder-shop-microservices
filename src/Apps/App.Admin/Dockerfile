# check=skip=FromAsCasing
FROM node:22-alpine AS build

# Declare all build arguments from env file
ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_REALM
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_REDIRECT_URI
ARG VITE_KEYCLOAK_BASE_URL
ARG VITE_API_GATEWAY

# Set environment variables for Vite build
ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL
ENV VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM
ENV VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID
ENV VITE_KEYCLOAK_REDIRECT_URI=$VITE_KEYCLOAK_REDIRECT_URI
ENV VITE_KEYCLOAK_BASE_URL=$VITE_KEYCLOAK_BASE_URL
ENV VITE_API_GATEWAY=$VITE_API_GATEWAY

WORKDIR /app

COPY src/Apps/App.Admin/package*.json ./

RUN npm install

COPY src/Apps/App.Admin/ .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
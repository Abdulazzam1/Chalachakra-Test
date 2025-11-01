# ----- Stage 1: Build React App -----
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ----- Stage 2: Serve with Nginx -----
FROM nginx:alpine
# Salin hasil build dari Stage 1
COPY --from=build /app/dist /usr/share/nginx/html
# Hapus konfigurasi default Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Kita akan tambahkan konfigurasi Nginx kita sendiri
COPY nginx.conf /etc/nginx/conf.d
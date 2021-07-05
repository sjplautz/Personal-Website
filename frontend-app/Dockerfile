FROM nginx:1.13.1-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY /dist/frontend-app /usr/share/nginx/html
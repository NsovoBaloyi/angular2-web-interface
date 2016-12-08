FROM nginx:latest

MAINTAINER Nsovo Baloyi

COPY dist/ /usr/share/nginx/html

EXPOSE 80
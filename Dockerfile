FROM node
LABEL maintainer kohubi

ENV production true
ENV PORT 8080
EXPOSE 8080
ADD . /wetube
WORKDIR /wetube

RUN npm install

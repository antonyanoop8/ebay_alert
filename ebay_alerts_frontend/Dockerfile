FROM node:14.17.5-alpine
WORKDIR /app/frontend

COPY package.json yarn.lock ./
RUN yarn install 
# RUN yarn install react-scripts@3.4.1 -g 
COPY . ./
EXPOSE 3000
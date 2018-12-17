FROM alpine:3.7

RUN apk add --no-cache nodejs 

WORKDIR /usr/src/ms_test_app

COPY package*.json ./

RUN npm config set unsafe-perm true
RUN npm install

#bundle our server source code
COPY . .

EXPOSE 80
CMD ["npm", "start"]

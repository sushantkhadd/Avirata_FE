# Nodejs Base image
FROM node:10.13.0
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# install and app dependencies
RUN npm install -g @angular/cli@6.0.0
COPY package.json /app/package.json
RUN npm install --save --legacy-peer-deps
COPY . /app
# RUN npm install -g npm@8.3.0
# RUN npm -v
# add app
# COPY . /app
# start app
EXPOSE 4200
CMD ng serve --host 0.0.0.0
# pull official base image
FROM node:22.2.0-alpine3.20

# set work directory
WORKDIR /srv/app/

# add to $PATH
ENV PATH /srv/app/node_modules/.bin:$PATH


# install curl
RUN apk add --no-cache curl

# install Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | sh
# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./


FROM node:10
MAINTAINER Bart Oleszczyk <bart@primate.co.uk>
ENV APP_PATH /active_admin_slickr
RUN mkdir /active_admin_slickr
WORKDIR /tmp
WORKDIR /active_admin_slickr
ADD . /active_admin_slickr

# YARN
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get -y install yarn
RUN yarn install

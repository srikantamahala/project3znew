FROM ubuntu
MAINTAINER Thanuj <thanuj.ravindranath@happiestminds.com>
WORKDIR /cpiwebapp
ADD . /cpiwebapp
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN npm install --prefix /cpiwebapp/

EXPOSE 8080


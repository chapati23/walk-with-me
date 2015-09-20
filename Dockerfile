FROM ubuntu:14.04

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN sudo apt-get install -y nodejs nginx sqlite3 libsqlite3-dev

RUN useradd -d /home/app -m -s /bin/bash app
RUN npm install -g bower
RUN npm install -g gulp
RUN npm install -g forever

RUN mkdir -p /home/app/walk-with-me
WORKDIR /home/app/walk-with-me
ADD . /home/app/walk-with-me
RUN chown -R app /home/app/

USER app

RUN npm install
RUN cd client && bower install
RUN gulp build

ENV NODE_ENV production
EXPOSE 3000

COPY nginx_conf /etc/nginx/nginx.conf

CMD ["node", "/home/app/walk-with-me/server/index.js"]




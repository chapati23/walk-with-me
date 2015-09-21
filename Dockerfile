FROM 4.0.0-wheezy

RUN sudo apt-get install -y nginx sqlite3 libsqlite3-dev build-essential git

COPY nginx_conf /etc/nginx/nginx.conf

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

CMD ["node", "/home/app/walk-with-me/server/index.js"]




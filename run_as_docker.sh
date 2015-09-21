#!/bin/bash

docker build --rm=true --no-cache=false -t wwm/wwm . && \
docker stop wwm | xargs docker rm -fv && \
docker run -tid -p 80:80 --name wwm wwm/wwm

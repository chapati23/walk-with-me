#!/bin/bash

docker build --rm=true --no-cache=false -t wwm/wwm . && \
docker stop wwm | xargs docker rm -fv && \
docker run -tid -p 3000:3000 --name wwm wwm/wwm

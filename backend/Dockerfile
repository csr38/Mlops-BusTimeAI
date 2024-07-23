# pull official base image
FROM python:3.12-alpine3.20

# set work directory
WORKDIR /srv/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
# install temp dependencies for build of pyscopg2 etc
RUN apk add --update --no-cache --virtual .tmp-build-deps \
  gcc \
  libc-dev \
  linux-headers \
  musl-dev \
  zlib zlib-dev \
  && pip install -r requirements.txt \
  && apk del --no-cache .tmp-build-deps

# copy entrypoint.sh
COPY ./entrypoint.sh .

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/srv/app/entrypoint.sh"]
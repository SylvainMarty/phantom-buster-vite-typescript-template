FROM node:16-alpine AS web-node
WORKDIR /app
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium
RUN apk add chromium
RUN npm install -g puppeteer@15.3.0

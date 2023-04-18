FROM node:18.7.0-alpine AS development

WORKDIR /home

ENV PATH /node_modules/.bin:$PATH

RUN npm install -g yarn -f

COPY ../../.yarn ./.yarn/
COPY ../../.yarnrc.yml .
COPY ../../yarn.lock .
COPY ../../package.json .

RUN yarn install

COPY ../../ .

FROM development AS build

RUN yarn build

FROM nginx:alpine

COPY --from=build /home/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /home/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

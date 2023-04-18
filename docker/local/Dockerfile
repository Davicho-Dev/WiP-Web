FROM node:18.7.0-alpine

WORKDIR /home

ENV PATH /node_modules/.bin:$PATH

RUN npm install -g yarn -f

COPY ../../.yarn ./.yarn/
COPY ../../.yarnrc.yml .
COPY ../../yarn.lock .
COPY ../../package.json .

RUN yarn install

COPY ../.. .

EXPOSE 3000

CMD ["yarn", "dev:host"]

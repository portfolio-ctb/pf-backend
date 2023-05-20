ARG NODE_VERSION=18.13.0

FROM node:${NODE_VERSION}-alpine as development
WORKDIR /app

COPY nest-cli.json package.json tsconfig.build.json tsconfig.json yarn.lock ./
COPY ./src ./src
COPY ./test ./test

RUN yarn install --production
RUN yarn global add @nestjs/cli
RUN yarn build

EXPOSE 8080

CMD [ "node" "dist/main" ]
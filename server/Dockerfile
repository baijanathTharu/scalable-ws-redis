FROM node:20-alpine-lts AS builder

WORKDIR /app

RUN npm install -g yarn

COPY server/package.json package.json

COPY server/yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

RUN yarn build

FROM node:20-alpine-lts AS RUNNER

WORKDIR /app

COPY --from=builder /app/dist dist
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

CMD [ "node", "dist/main.js" ]


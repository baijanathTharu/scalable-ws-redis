FROM node:20-alpine AS builder

WORKDIR /app

COPY server/package.json package.json

COPY server/yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

COPY server .

RUN yarn build

FROM node:20-alpine AS RUNNER

WORKDIR /app

COPY --from=builder /app/dist dist
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

CMD [ "node", "dist/main.js" ]


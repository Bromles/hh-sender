FROM node:20-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./

RUN npm ci

COPY ./src ./src

RUN npm run build
RUN rm -rf node_modules
RUN npm ci --omit=dev

# node 20.11.1
FROM alpine:3.19 as runner
RUN apk --no-cache add nodejs ca-certificates

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder ./app/package.json ./app/package-lock.json ./
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]

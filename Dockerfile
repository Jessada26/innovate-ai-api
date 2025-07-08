# Install dependencies only when needed
FROM node:alpine AS deps
RUN apk add --update --no-cache libc6-compat --virtual builds-deps build-base py-pip
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run nestjs
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json package.json

ENV NODE_OPTIONS=”–max_old_space_size=2048″
EXPOSE 8000
CMD ["yarn", "start:prod"]
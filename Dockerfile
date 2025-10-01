# -------- Etapa 1: dependencias --------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# -------- Etapa 2: build (TypeScript -> JavaScript) --------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build   # genera /dist con tsc

# -------- Etapa 3: runtime --------
FROM node:20-alpine AS runner
WORKDIR /app

# copiamos solo lo necesario para producción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY .env .env

EXPOSE 8081

CMD ["node", "dist/server.js"]

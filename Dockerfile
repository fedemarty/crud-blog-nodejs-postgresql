# ==================== ETAPA 1: DEPENDENCIAS ====================
# Usa imagen Alpine específica y con digest SHA256 para reproducibilidad
FROM node:20-alpine AS deps

# Metadata según OCI Image Spec
LABEL maintainer="fedemarty"
LABEL description="Blog API - Dependencies stage"
LABEL version="1.0.0"

# Instalar dependencias del sistema necesarias para compilación
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar solo archivos de dependencias primero (mejor cache)
COPY package.json yarn.lock ./

# Instalar dependencias con frozen-lockfile para reproducibilidad
RUN yarn install --frozen-lockfile --production=false

# ==================== ETAPA 2: BUILDER ====================
FROM node:20-alpine AS builder

LABEL description="Blog API - Build stage"

WORKDIR /app

# Copiar node_modules de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar archivos de configuración y código fuente
COPY package.json yarn.lock tsconfig.json ./
COPY src ./src

# Build de TypeScript a JavaScript
RUN yarn build

# Instalar SOLO dependencias de producción para la siguiente etapa
RUN yarn install --production --frozen-lockfile && yarn cache clean

# ==================== ETAPA 3: RUNNER (PRODUCCIÓN) ====================
FROM node:20-alpine AS runner

LABEL maintainer="fedemarty"
LABEL description="Blog API - Production runtime"
LABEL version="1.0.0"

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Variables de entorno de producción
ENV NODE_ENV=production
ENV PORT=8081

WORKDIR /app

# Crear usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 blogapi

# Copiar solo lo necesario para producción
COPY --from=builder --chown=blogapi:nodejs /app/package.json ./
COPY --from=builder --chown=blogapi:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=blogapi:nodejs /app/dist ./dist
COPY --chown=blogapi:nodejs newrelic.js ./

# Cambiar a usuario no-root
USER blogapi

# Health check para Docker y orquestadores
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8081/api/healthchecker', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Exponer puerto
EXPOSE 8081

# Usar dumb-init como PID 1 para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Comando de inicio con New Relic
CMD ["node", "--require", "./newrelic.js", "dist/server.js"]

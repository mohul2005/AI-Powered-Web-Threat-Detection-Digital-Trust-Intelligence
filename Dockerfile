# ==========================================
# TrustMatrix AI Nexus - Production Dockerfile
# Implements Section 8: Infrastructure (Docker & Cloud Hosting)
# ==========================================

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Runtime Production Image
FROM node:20-alpine AS runner
WORKDIR /app

# Install Python & OpenSSL tools for security inspection scripts
RUN apk add --no-cache python3 py3-pip openssl ca-certificates curl

# Install Server Dependencies
WORKDIR /app
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm ci --omit=dev

# Copy Application Source
COPY server/ ./server/
COPY --from=client-builder /app/client/dist ./client/dist

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/scenarios || exit 1

# Start Server
CMD ["node", "server/src/index.js"]

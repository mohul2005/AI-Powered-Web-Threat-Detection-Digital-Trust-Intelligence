# ==========================================
# TrustMatrix AI Nexus - Production Dockerfile
# Implements Section 8: Infrastructure (Docker & Cloud Hosting)
# ==========================================

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
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
RUN npm install --omit=dev

# Copy Application Source
COPY server/ ./server/
COPY --from=client-builder /app/client/dist ./client/dist

# Environment variables
ENV NODE_ENV=production
EXPOSE 3000 5000 8080

# Start Server
CMD ["node", "server/src/index.js"]

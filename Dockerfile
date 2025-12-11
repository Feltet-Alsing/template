# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable Corepack for Yarn
RUN corepack enable

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Enable Corepack for Yarn
RUN corepack enable

# Copy built app from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/lib/db.ts ./src/lib/
COPY --from=builder /app/src/lib/migrate.ts ./src/lib/
COPY --from=builder /app/src/lib/migrations ./src/lib/migrations
COPY --from=builder /app/docker-entrypoint.sh ./

# Make entrypoint executable
RUN chmod +x docker-entrypoint.sh

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the app with migrations
ENTRYPOINT ["./docker-entrypoint.sh"]

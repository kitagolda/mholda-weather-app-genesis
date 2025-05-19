FROM node:lts-bullseye AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run client:build & npm run server:build

FROM node:lts-bullseye

WORKDIR /app

COPY --from=builder /app/server/dist ./server/dist

# Copy Prisma schema
COPY --from=builder /app/prisma ./prisma

# Copy server package.json for dependency install
COPY --from=builder /app/package*.json ./

# Install only production server deps
WORKDIR /app/server
COPY --from=builder /app/server/package*.json ./
RUN npm install --production

# Copy client static files (optional if you serve frontend separately)
WORKDIR /app/client
COPY --from=builder /app/client/dist ./dist

# Set workdir to /app for script
WORKDIR /app

# Add start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 3000

CMD ["/bin/bash", "/app/start.sh"]
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
# Build with production deps only and relax peer deps to avoid conflicts
ENV NODE_ENV=production
ENV npm_config_legacy_peer_deps=true
# Use deterministic installs and disable extra network noise to reduce chances of hanging
RUN npm ci --omit=dev --no-audit --no-fund --progress=false

COPY . .

EXPOSE 3004

CMD ["node", "server.js"]
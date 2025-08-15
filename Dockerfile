FROM node:18

WORKDIR /app

COPY package.json ./
# Build with production deps only and relax peer deps to avoid conflicts
ENV NODE_ENV=production
ENV npm_config_legacy_peer_deps=true
# Use classic install to match previous working behavior
RUN npm install --omit=dev --no-audit --no-fund --progress=false

COPY . .

EXPOSE 3004

CMD ["node", "server.js"]
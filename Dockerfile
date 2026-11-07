FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
# Nur Laufzeit-Abhängigkeiten. Danach npm/npx entfernen: zur Laufzeit unnötig und
# brachte veraltete Bibliotheken (tar) mit ins Image.
RUN npm ci --omit=dev && npm cache clean --force \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm
COPY --from=build /app/dist ./dist
COPY api ./api
COPY server.js ./
# Nicht als root laufen.
USER node
EXPOSE 3000
CMD ["node", "server.js"]

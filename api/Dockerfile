FROM node:20

WORKDIR /usr/src/app

# Copie et installation
COPY package.json package-lock.json ./
RUN npm install

# Copie du code source
COPY . .

# Build TypeScript + exécution
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start"]

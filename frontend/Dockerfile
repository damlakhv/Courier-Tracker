# frontend/Dockerfile

# 1. Hafif bir Node imajı
FROM node:16-alpine

# 2. Çalışma dizini
WORKDIR /app

# 3. package.json ve package-lock.json’ı kopyala, bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# 4. Kaynak kodlarını kopyala
COPY . .

# 5. Dev server’ın port’unu expose et
EXPOSE 3000

# 6. Container ayağa kalkınca dev server’ı başlat
CMD ["npm", "start"]

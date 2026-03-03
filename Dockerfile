# Pake Node.js versi LTS yang ringan
FROM node:20-alpine

# Bikin folder kerja di dalem container
WORKDIR /app

# Copy file package.json dan package-lock.json duluan
COPY package*.json ./

# Install dependencies di dalem Docker
RUN npm install

# Copy semua sisa file project abang
COPY . .

# Buka port 5173 (port defaultnya Vite)
EXPOSE 5173

# Jalanin server Vite, ditambahin --host 0.0.0.0 biar bisa diakses dari browser abang
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
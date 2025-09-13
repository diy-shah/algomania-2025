# Frontend Dockerfile

# 1. Use Node.js base image
FROM node:20-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first
COPY package*.json ./

# 4. Install dependencies
RUN npm install --legacy-peer-deps

# 5. Copy all project files
COPY . .

# 6. Add build-time ARG and ENV (so NEXT_PUBLIC_ vars get baked in)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 7. Build Next.js app
RUN npm run build

# 8. Expose port 3000 for Next.js
EXPOSE 3000

# 9. Start Next.js production server
CMD ["npm", "start"]

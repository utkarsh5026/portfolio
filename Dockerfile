# Use Node.js 20 as our base image
FROM node:20-alpine AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for efficient caching
COPY app/package.json app/package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy application code
COPY app/ ./

# Build the application
RUN npm run build

# Production stage: use nginx to serve static files
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
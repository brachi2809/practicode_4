# Use official Node.js image as base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for API
COPY TodoApi/package*.json ./TodoApi/

# Install dependencies for the API
RUN cd TodoApi && npm install

# Copy the rest of the API code
COPY TodoApi ./TodoApi

# Set the working directory for the client
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json for client
COPY client/package*.json ./client/

# Install dependencies for the client
RUN cd client && npm install

# Copy the rest of the client code
COPY client ./client

# Expose necessary ports
EXPOSE 3000 8080

# Start both API and Client using concurrently
WORKDIR /usr/src/app
RUN npm install -g concurrently
CMD ["sh", "-c", "concurrently \"cd TodoApi && npm start\" \"cd client && npm run serve\""]

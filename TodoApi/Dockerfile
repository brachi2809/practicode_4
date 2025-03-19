# Use official Node.js image as base image
FROM node:16

# Set the working directory in the container for the server
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (אם הם קיימים ב-TodoApi)
COPY TodoApi/package*.json ./

# Install dependencies for the server
RUN npm install

# Copy the rest of the server code
COPY TodoApi ./

# Expose the port that the server runs on (change if necessary)
EXPOSE 3000

# Command to run the server
CMD ["npm", "start"]

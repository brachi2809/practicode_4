# Use official Node.js image as base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on (change if necessary)
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]

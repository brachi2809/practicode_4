# Use official Node.js image as base image
FROM node:16

# Set the working directory in the container for the server
WORKDIR /usr/src/app

# Copy the API's package.json and package-lock.json
COPY TodoApi/package*.json ./TodoApi/

# Install dependencies for the server
RUN cd TodoApi && npm install

# Copy the rest of the server code
COPY TodoApi ./TodoApi

# Set up the client part
WORKDIR /usr/src/app/client

# Copy the client's package.json and package-lock.json
COPY client/package*.json ./client/

# Install dependencies for the client
RUN cd client && npm install

# Copy the rest of the client code
COPY client ./client

# Set environment variables (appsettings.json)
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ConnectionStrings__ToDoDB="server=localhost;user=chani;password=Ch214856;database=tododb"
ENV Logging__LogLevel__Default="Information"
ENV Logging__LogLevel__Microsoft_AspNetCore="Warning"
ENV AllowedHosts="*"

# Expose ports for the client and API
EXPOSE 3000 8080

# Command to run both the server and client
CMD ["sh", "-c", "cd TodoApi && npm start & cd client && npm run serve"]

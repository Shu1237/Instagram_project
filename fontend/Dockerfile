# Use the official Node.js 16 image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies with --legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your application will run on
EXPOSE 3000

# Start the application using nodemon
CMD ["npx", "nodemon", "backend/app.js"]
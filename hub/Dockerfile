# Use a Debian-based Node.js base image
FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Update the package manager and install sqlite3, then install Node.js dependencies
RUN apt-get update && apt-get install -y sqlite3 && npm install

# Copy the rest of the application code
COPY . .

# Default command to run the application
CMD ["npm", "start"]

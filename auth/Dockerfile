# Use a Debian-based Node.js base image
FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Default command to run the application
CMD ["npm", "start"]

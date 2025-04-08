# Use an official Node runtime as a parent image
FROM node:22

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining application files to the working directory
COPY . .

# Expose port 5173 for the application (Vite default port)
EXPOSE 5173

# Start the application (development mode)
CMD [ "npm", "run", "dev" ]

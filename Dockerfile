#Base Image - Smaller most stable node image; larger: node:19-bullseye
FROM node:21-bullseye-slim 

# Use this path as defulat location to run commands
WORKDIR /app

# Copy files from local location into working docker location
COPY . .

# Install dependencies
RUN npm install

# Build the React app for production
RUN npm run build

# Expose the port that the application will run on
EXPOSE 5173

# The command to run your application (serve the Vite build)
CMD ["npm", "run", "dev"]
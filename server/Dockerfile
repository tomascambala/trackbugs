FROM node:20.10.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build script to compile TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Run the compiled app
CMD ["node", "dist/app.js"]

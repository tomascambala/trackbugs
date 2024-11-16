FROM node:20.10.0 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app's code
COPY . .

# Build the app
RUN npm run build

# Use an Nginx image to serve the built app
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# frontend/Dockerfile

# Build the Angular app
FROM node:16.17.0-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use Nginx to serve the compiled Angular app
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the compiled Angular app to the Nginx web server directory
COPY --from=build-stage /app/dist /usr/share/nginx/html



# Expose port 80 to be accessed from outside the container
EXPOSE 80






FROM node:12-slim
ARG TIER=test

LABEL maintainer="dpattermann@usgs.gov"
# Create temp directory for building viz app
RUN mkdir -p /tmp/MLR-User-Interface

# Set Workdir
WORKDIR /tmp/MLR-User-Interface
# Copy from source to containers filesystem
COPY . . 

# Build the Vue app.
RUN npm install
# Need -- --mode=test to pass test environment variables in
RUN npm run build "--mode=$TIER"

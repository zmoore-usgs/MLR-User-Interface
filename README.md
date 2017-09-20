# MLR-User-Interface
[![Build Status](https://travis-ci.org/USGS-CIDA/MLR-User-Interface.svg?branch=master)](https://travis-ci.org/USGS-CIDA/MLR-User-Interface) [![Coverage Status](https://coveralls.io/repos/github/USGS-CIDA/MLR-User-Interface/badge.svg?branch=master)](https://coveralls.io/github/USGS-CIDA/MLR-User-Interface?branch=master)


Simple UI for interacting with MLR. Currently only supports Ddot File Upload

## Running the Application
Copy the application-test.yml file from the project root directory to an "application.yml" file also at the project root directory and change the values as needed.
Open a terminal and cd to the project root directory. Within this directory run 
```
mvn spring-boot:run
``` 
and then the application will launch and be available at http://localhost:8080/swagger-ui.html

## Using Docker
This docker image is designed to be used with Docker Swarm and as such it uses Docker Secrets for passing in configuration.

### Building the Image
The docker image is built using a jar version that has been uploaded to the CIDA artifactory. The artifact version needs to be provided as follows:
```
% docker build --build-arg mlr-version=0.1-SNAPSHOT -t mlr_interface .
```

### Creating the Docker Service
On the docker manager of your swarm you can create the service to run this application by running a command such as (where `mlr_interface` is the name of the built image):
```
docker service create --name mlrnotification --publish 8080:8080 --env MLR_GATEWAY_HOST=192.168.99.101 --env MLR_GATEWAY_PORT=8082 --env MLR_GATEWAY_UPLOAD_PATH=/workflows/ddots/ --env MLR_GATEWAY_VALIDATE_PATH=/workflows/ddots/validate mlr_interface
```
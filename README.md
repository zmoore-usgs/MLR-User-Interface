# MLR-User-Interface
[![Build Status](https://travis-ci.org/USGS-CIDA/MLR-User-Interface.svg?branch=master)](https://travis-ci.org/USGS-CIDA/MLR-User-Interface)


Simple UI for interacting with MLR. Currently only supports Ddot File Upload

## Running the Application
Copy the application-test.yml file from the project root directory to an "application.yml" file also at the project root directory and change the values as needed.
Open a terminal and cd to the project root directory. Within this directory run 
```
mvn spring-boot:run
``` 
and then the application will launch and be available at http://localhost:8080/swagger-ui.html

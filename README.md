# mlr-ui

You will need to create a file named `config.json` and store it in the `public` folder.  It should have one entry: 

```
{"STATION_CHANGE_ENABLED": "true"}
```

This will enable the station change widget to show up.  Do not check it into source control, or it will overwrite the file in S3 upon deploy.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

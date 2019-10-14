# Race Results Client
Long-polls a REST API endpoint that provides race events, then persists the event data to a database.

## Starting the client

### Config parameters
Following configurations can be provided via env variables:
* ```RESULTS_ENDPOINT```: URL to the REST endpoint providing race event data, e.g: http://35.207.169.147/results  
* ```MONGO_URL```: Complete URL to the mongo DB you want to store the event data in, e.g mongodb://localhost:27017/race_events

### Database
The provided docker compose config starts a dockerized mongo db accessable on URL: mongodb://localhost:27017/race_events
Start the DB like this:
```
docker-compose down && docker-compose up -d  
```

### Run command
Passing env vars with command can look like this:     
```
RESULTS_ENDPOINT=http://35.207.169.147/results MONGO_URL=mongodb://localhost:27017/race_events npm start
```

## Running test
```
npm test  
```

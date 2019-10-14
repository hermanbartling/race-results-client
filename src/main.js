const Config = require('./Config');
const ApiPoller = require('./ApiPoller');
const dbService = require('./dbService');

dbService.connect(Config.getMongoUrl());

const apiPoller = new ApiPoller(
    Config.getResultsEndpoint(),
    (raceEvent) => {
        dbService.addEvent(raceEvent)
            .then((addedEvent) => {
                console.log(`Added event (id:${addedEvent._id}, horse.name: ${addedEvent.horse.name}`)
            });
    }
);

apiPoller.start();



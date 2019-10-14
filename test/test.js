const assert = require('assert');
const mongoUnit = require('mongo-unit');
const dbService = require('../src/dbService');

describe('Testing the dbService', () => {

    before(() => dbService.connect(process.env.MONGO_URL));
    afterEach(() => mongoUnit.drop());
    after(() => mongoUnit.stop());

    it('dbService.addEvent() should return correct data', () => {

        const eventToBeStored = {
            event: "start",
            time: 314,
            horse: {
                name: "Jolly Jumper",
                id: 3
            }
        };

        return dbService.addEvent(JSON.stringify(eventToBeStored))
            .then((event) => {
                assertEventsEqual(event, eventToBeStored);
            })
    });

    it('an added event data should be returned with dbService.allEvents()', () => {

        const eventToBeStored = {
            event: "stop",
            time: 628,
            horse: {
                name: "Molly Bumper",
                id: 6
            }
        };

        return dbService.addEvent(JSON.stringify(eventToBeStored))
            .then(() => dbService.getEvents())
            .then((allEvents) => {
                assert.equal(allEvents.length, 1, 'unexpected number of stored events');
                assertEventsEqual(allEvents[0], eventToBeStored);
            })
    });
});

function assertEventsEqual(actual, expected) {
    assert.equal(actual.event, expected.event, 'event mismatch');
    assert.equal(actual.time, expected.time, 'time mismatch');
    assert.equal(actual.horse.name, expected.horse.name, 'horse.name mismatch');
    assert.equal(actual.horse.id, expected.horse.id, 'horse.id mismatch');
}


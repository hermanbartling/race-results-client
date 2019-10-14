const mongoUnit = require('mongo-unit');
const prepare = require('mocha-prepare')

prepare(done => mongoUnit.start()
    .then(testMongoUrl => {
        process.env.MONGO_URL = testMongoUrl;
        done();
        console.log('Fake mongo DB is started: ', testMongoUrl);
    })
);

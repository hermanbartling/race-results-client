const mongoose = require('mongoose');

function conn(url) {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("Connected to DB"))
        .catch((err) => {
            console.error("Connection to DB failed with error:", err.stack);
            process.exit(1)
        });
}

const EventSchema = new mongoose.Schema({
    event: String,
    time: Number,
    horse: {
        name: String,
        id: Number
    }
});
const Event = mongoose.model('events', EventSchema);

module.exports = {
    connect: (url) => conn(url),
    getEvents: () => {
        return Event.find()
            .catch((err) => {
                console.error("Reading events from DB failed with error:", err.stack);
            });

    },
    addEvent: stringData => {
        let jsonData = JSON.parse(stringData);

        return new Event(jsonData).save()
            .catch((err) => {
                console.error("Saving event to DB failed with error:", err.stack);
            });

    }
};
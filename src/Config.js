class Config {

    static getResultsEndpoint() {
        return process.env.RESULTS_ENDPOINT || "http://localhost:3000/results";
    }

    static getMongoUrl() {
        return process.env.MONGO_URL || "mongodb://localhost:27017/race_events";
    }

}

module.exports = Config;
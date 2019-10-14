const request = require('request');

class ApiPoller {

    constructor(endpoint, eventProcessingCallback) {
        this.endpoint = endpoint;
        this.eventProcessingCallback = eventProcessingCallback;
    }

    poll() {
        request(
            this.endpoint,
            {
                method: "GET",
                timeout: 16000,
                headers: {
                    'Accept': 'application/json'
                }
            },
            (error, response, body) => {
                if (!error) {

                    if (response.statusCode !== 200 && response.statusCode !== 204) {
                        console.log(`Unexpected status '${response.statusCode}', server says: \n\n${body}`);
                        console.log("... aborting polling loop");
                        return;
                    }

                    if (response.statusCode === 200) {

                        // process the event!
                        this.eventProcessingCallback(body);

                    } else {
                        console.log(`No race results (got status: ${response.statusCode})`)
                    }

                    this.poll();


                } else {
                    console.log(`Failed reading race events on ${this.endpoint}:`);
                    console.log("");
                    console.log(error);
                    console.log("");
                    console.log("... aborting polling loop");
                }
            }
        );
    }

    start() {
        console.log(`Starting polling endpoint '${this.endpoint}'`);
        this.poll()
    }

}

module.exports = ApiPoller;
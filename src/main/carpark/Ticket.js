const Dates = require('./Dates');

class Ticket {

    constructor() {
        this.dateTime = Date.now();
    }

    timeSpent() {
        return Dates.timeSince(this.dateTime);
    }

}

module.exports = Ticket;
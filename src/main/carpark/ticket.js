const Dates = require('./dates');

class Ticket {

    constructor() {
        this.dateTime = Date.now();
    }

    timeSpent() {
        return Dates.timeSince(this.dateTime);
    }

}

module.exports = Ticket;
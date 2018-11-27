const Dates = require('./Dates');

class Ticket {

    constructor() {
        this.dateTime = Date.now();
    }

    /**
     * Returns the amount of time that has gone since the ticket was created.
     *
     * @returns {number[]} An array in the format [days, hours, minutes, seconds]
     */
    timeSpent() {
        return Dates.timeSince(this.dateTime);
    }

    /**
     * A custom JSON serializer that is able to read and write
     * the result of the timeSpent function when it is called
     * by JSON.stringify.
     *
     * Without this custom toJSON, JSON will only write the
     * dateTime property. It will not add a timeSpent property
     * because it's a function. This custom toJSON method,
     * adds the 'timeSpent' property and writes the result
     * of the function.
     *
     * The result will then be something like
     *
     * {
        dateTime: 1543333267255,
        timeSpent: [0.00058,0.01402,0.84128,50.477]
       }
     *
     *
     * @param key
     * @returns {{dateTime: number, timeSpent: Array}}
     */
    toJSON(key) {
        return {
            dateTime: this.dateTime,
            timeSpent: this.timeSpent()
        }
    }

}

module.exports = Ticket;
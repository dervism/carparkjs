class Dates {
    /**
     * Calculates the days, hours, minutes and
     * seconds since the given 'date'.
     * @param date A date and time in the past
     * @returns {number[]} the difference
     */
    static timeSince(date) {
        const diff = Date.now() - date;

        let seconds = diff/1000;
        let minutes = diff/60000;
        let hours = diff/3600000;
        let days = diff/86400000;

        return [days, hours, minutes, seconds];
    }

    /**
     * Blocks the main thread of Node to
     * simulate a Thread.sleep like in Java.
     * @param msg The message to output
     * @param time Number of seconds to sleep
     */
    static sleep(msg, time) {
        console.log(msg, (time / 1000));
        const stop = new Date().getTime() + time;
        while (new Date().getTime() < stop) {}
    }
}

module.exports = Dates;
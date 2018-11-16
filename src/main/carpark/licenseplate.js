class LicensePlate {

    constructor (nr) {
        // use constructor param, or generate random plate nr.
        this.nr = nr ? nr : LicensePlate.generateRandomPlateNr();
    }

    static generateRandomPlateNr(pattern = ['', '', 1, 1, 1, 1, 1]) {
        return pattern
            .map(value => {
                if (typeof value === 'string') {
                    return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toLocaleUpperCase();
                }
                if (typeof value === 'number') return Math.round(Math.random() * 9)
            })
            .reduce((previousValue, currentValue) => `${previousValue}${currentValue}`);
    }

}

module.exports = LicensePlate;
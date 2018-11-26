class Car {

    constructor(licencePlateNr, type = 'car') {
        if (!licencePlateNr) throw new Error("Car has no license plate number.");
        this.licencePlateNr = licencePlateNr;
        this.type = Car.typeImg(type);
    }

    static typeImg(t) {
        if (t === 'car') return '🚗';
        if (t === 'truck') return '🚚';
        if (t === 'bike') return '🛵';

        return t;
    }

    /**
     * Tries to read the license plate number from a Car object.
     *
     * If 'carId' is an Object, then read the licencePlateNr field.
     * If 'carId' is a string, then just return it back (meaning the
     * string already is a licence plate number).
     *
     * @param carId A Car object, or a string (licencePlateNr)
     * @returns string The licencePlateNr of a car.
     */
    static getPlateNr(carId) {
        if (typeof carId === 'object') return carId.licencePlateNr;
        if (typeof carId === 'string') return carId;
    }
}

module.exports = Car;
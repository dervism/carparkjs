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

}

module.exports = Car;
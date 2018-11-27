const Ticket = require('./Ticket');
const ParkingSlot = require("./ParkingSlot");
const Car = require("./Car");
const CarParkOperator = require("./CarParkOperator");

/**
 * The ParkingHouse class has a list of parked cars.
 *
 * It uses a CarParkOperator class to calculate  cost for the parked cars.
 * If noe operator is set, then a default expensive operator will be created.
 *
 * @see CarParkOperator
 */

class ParkingHouse {

    constructor(space, operator) {
        this.space = space;
        this.operator = operator || CarParkOperator.createExpensiveCarPark();
        this.parkingSlots = [];
    }

    allCarsWithCostInfo() {
        return this.parkingSlots.map(slot => this.calculateCost(slot));
    }

    addCar(car) {
        if (this.space === 0)
            throw new Error(Errors.noMoreSpaceLeft());

        const parkedCar = new ParkingSlot(car, new Ticket());

        this.parkingSlots.push(parkedCar);
        this.space--;

        return parkedCar;
    }

    getCar(carId) {
        const carIndex = this.slotNumber(carId);
        if (carIndex === -1) throw Error(Errors.noSuchCar(carId));

        return this.calculateCost(this.parkingSlots[carIndex]);
    }

    hasCar(carId) {
        const carIndex = this.slotNumber(carId);
        return carIndex > -1;
    }

    removeCar(carId) {
        let slotNr = this.slotNumber(carId);
        if (slotNr === -1) throw Error(Errors.noSuchCar(carId));

        let [slot] = this.parkingSlots.splice(slotNr, 1);
        this.space++;

        return this.calculateCost(slot);
    }

    /**
     * Returns the slot number in the list.
     * @param carId Can be either a licence plate number, or a Car object.
     * @returns {number} The index in the list, or -1 if not found.
     */
    slotNumber(carId) {
        return this.parkingSlots
            .map(slot => slot.car)
            .findIndex(parkedCar => {
                if (typeof carId === 'object') return parkedCar.licencePlateNr === carId.licencePlateNr;
                if (typeof carId === 'string') return parkedCar.licencePlateNr === carId;
            });
    }

    print() {
        return this.parkingSlots
            .map(slot => slot.car)
            .forEach(car => console.log(car));
    }

    /**
     * Returns a copy of a slot with cost information added.
     *
     * @param slot
     * @returns {ParkingSlot}
     */
    calculateCost(slot) {
        return slot.withCost(this.operator.calculateCost(slot));
    }
}

/**
 * Instead of copying and duplicating the same error messages, we define them just
 * one time in a separate errors Map and just reuse them where ever needed.
 */
const Errors = {
    noSuchCar: (carId) => "ParkingHouse does not contain the car with license plate ." + Car.getPlateNr(carId),
    noMoreSpaceLeft: () => "No more space left in this car park."
};

module.exports = ParkingHouse;
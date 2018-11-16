const Ticket = require('./ticket');

class ParkingHouse {

    constructor(space) {
        this.space = space;
        this.parkingSlots = [];
    }

    allCars() {
        return this.parkingSlots.map(slot => {
            return {
                ticket: slot.ticket,
                car: slot.car,
                timeSpent: slot.ticket.timeSpent(),
                cost: ParkingHouse.calculateCost(slot.ticket)
            };
        });
    }

    parkCar(car) {
        if (this.space === 0)
            throw new Error("No more space left in this parking house.");

        this.parkingSlots.push({
            ticket: new Ticket(),
            car
        });

        this.space--;
    }

    hasCar(car) {
        const carIndex = this.slotNumber(car);
        return carIndex > -1;
    }

    removeCar(car) {
        let slotNr = this.slotNumber(car);
        if (slotNr === -1) throw Error("ParkingHouse does not contain this car.");

        let [slot] = this.parkingSlots.splice(slotNr, 1);
        return ParkingHouse.calculateCost(slot.ticket);
    }

    slotNumber(car) {
        return this.parkingSlots
            .map(slot => slot.car)
            .findIndex(parkedCar => {
                if (typeof car === 'object') return parkedCar.licencePlateNr === car.licencePlateNr;
                if (typeof car === 'string') return parkedCar.licencePlateNr === car;
            });
    }

    print() {

        return this.parkingSlots
            .map(slot => slot.car)
            .forEach(car => console.log(car));
    }

    static calculateCost(ticket) {
        const ticketTime = ticket.timeSpent();

        // calculate cost
        return (ticketTime[0] * 50) // days
            + (ticketTime[1] * 20)  // hours
            + (ticketTime[2] * 10)  // minutes
            + (ticketTime[3] * 5);  // seconds
    }

}

module.exports = ParkingHouse;
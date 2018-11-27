class ParkingSlot {

    constructor(car, ticket, cost = 0) {
        this.car = car;
        this.ticket = ticket;
        this.cost = cost;
    }

    withCost(value) {
        return new ParkingSlot(this.car, this.ticket, value);
    }
}

module.exports = ParkingSlot;
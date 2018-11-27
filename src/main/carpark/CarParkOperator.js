class CarParkOperator {

    constructor(name, costFunction) {
        this.name = name;
        this.costFunction = costFunction;
    }

    calculateCost(parkingSlot) {
        return this.costFunction(parkingSlot);
    }

    static createExpensiveCarPark() {
        return new CarParkOperator("Expensive CarPark", (parkingSlot) => {
            return CarParkOperator.ticketPrice(parkingSlot.ticket.timeSpent(), 50, 20, 10, 5);
        });
    }

    static createCheapCarPark() {
        return new CarParkOperator("Cheap CarPark", (parkingSlot) => {
            return CarParkOperator.ticketPrice(parkingSlot.ticket.timeSpent(), 25, 10, 5, 2);
        });
    }

    static ticketPrice(ticketTime, days, hours, minutes, seconds) {
        return (ticketTime[0] * days)
            + (ticketTime[1] * hours)
            + (ticketTime[2] * minutes)
            + (ticketTime[3] * seconds);
    }
}


module.exports = CarParkOperator;
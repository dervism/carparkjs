class CarParkOperator {

    constructor(name, costFunction) {
        this.name = name;
        this.costFunction = costFunction;
    }

    calculateCost(ticket) {
        return this.costFunction(ticket);
    }

    static createExpensiveCarPark() {
        return new CarParkOperator("Expensive CarPark", (ticket) => {
            return CarParkOperator.ticketPrice(ticket.timeSpent(), 50, 20, 10, 5);
        });
    }

    static createCheapCarPark() {
        return new CarParkOperator("Cheap CarPark", (ticket) => {
            return CarParkOperator.ticketPrice(ticket.timeSpent(), 25, 10, 5, 2);
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
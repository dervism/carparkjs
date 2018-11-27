const Dates = require("../../main/carpark/Dates");
const CarParkOperator = require("../../main/carpark/CarParkOperator");
const {Car, ParkingHouse, LicensePlate} = require('../../main/carpark');

test('car is parked', () => {
    const parking = new ParkingHouse(3);

    parkCars(parking, 2);

    expect(parking.parkingSlots).toHaveLength(2);
});

test('has parked car', () => {
    const parking = new ParkingHouse(3);

    parking.addCar(new Car("AB12345"));
    parkCars(parking, 2);

    expect(parking.hasCar("AB12345")).toBeTruthy();
});

test('get parked car', () => {
    const parking = new ParkingHouse(3);

    parking.addCar(new Car("AB12345"));
    parkCars(parking, 2);

    console.log(parking.getCar("AB12345"));
    expect(parking.getCar("AB12345")).toBeTruthy();
});

test('throws error when no space left', () => {
    const parking = new ParkingHouse(2);

    parkCars(parking, 2);

    expect(() => parking.addCar(new Car("AB98765"))).toThrow(/no more space left/i); // /i=ignore case
});

test('car is removed', () => {
    const parking = new ParkingHouse(3);

    const plateNrToRemove = "AB12345";
    parking.addCar(new Car(plateNrToRemove));
    parking.addCar(new Car("AB56743"));
    parking.addCar(new Car("AB54321"));

    parking.removeCar(plateNrToRemove);

    expect(parking.parkingSlots).toHaveLength(2);
});

test("parking slot has ticket and cost", () => {
    const parking = new ParkingHouse(3);
    parkCars(parking, 2);

    Dates.sleep("Waiting for %s seconds", 500);

    expect(parking.parkingSlots).toHaveLength(2);
    const car = parking.allCarsWithCostInfo().pop();

    expect(car.ticket).toHaveProperty('timeSpent');
    expect(car).toHaveProperty('cost');

    expect(car.ticket.timeSpent()[3]).toBeGreaterThanOrEqual(0.5);
    expect(car.cost).toBeGreaterThanOrEqual(2);
});

test("a custom cost function for free parking", () => {
    const parking = new ParkingHouse(3, new CarParkOperator("Free CarPark", (slot) => {
        return CarParkOperator.ticketPrice(slot.ticket.timeSpent(), 0, 0, 0, 0);
    }));

    parkCars(parking, 2);

    Dates.sleep("Waiting for %s seconds", 500);
    const car = parking.allCarsWithCostInfo().pop();

    expect(car.cost).toEqual(0);
});

function parkCars(parkingHouse, n) {
    for (let i = 0; i < n; i++) {
        parkingHouse.addCar(new Car(LicensePlate.generateRandomPlateNr()));
    }
}
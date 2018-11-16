const {Car, ParkingHouse, LicensePlate} = require('../../main/carpark');

test('car is parked', () => {
    const parking = new ParkingHouse(3);

    parkCars(parking, 2);

    expect(parking.parkingSlots).toHaveLength(2);
});

test('has parked car', () => {
    const parking = new ParkingHouse(3);

    parking.parkCar(new Car("AB12345"));
    parkCars(parking, 2);

    expect(parking.hasCar("AB12345")).toBeTruthy();
});

test('throws error when no space left', () => {
    const parking = new ParkingHouse(2);

    parkCars(parking, 2);

    expect(() => parking.parkCar(new Car("AB98765"))).toThrow(/no more space left/i); // /i=ignore case
});

test('car is removed', () => {
    const parking = new ParkingHouse(3);

    const plateNrToRemove = "AB12345";
    parking.parkCar(new Car(plateNrToRemove));
    parking.parkCar(new Car("AB56743"));
    parking.parkCar(new Car("AB54321"));

    parking.removeCar(plateNrToRemove);

    expect(parking.parkingSlots).toHaveLength(2);
});

function parkCars(parkingHouse, n) {
    for (let i = 0; i < n; i++) {
        parkingHouse.parkCar(new Car(LicensePlate.generateRandomPlateNr()));
    }
}
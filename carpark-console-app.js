const ParkingHouse = require('./src/main/carpark/ParkingHouse');
const Car = require('./src/main/carpark/Car');
const LicensePlate = require('./src/main/carpark/LicensePlate');
const Dates = require('./src/main/carpark/Dates');

/**
 * This file starts a simulation in console only.
 * You can run the program with this command in
 * a terminal/command line window: node main
 */

function main() {

    const phouse = new ParkingHouse(100);
    const car = new Car(LicensePlate.generateRandomPlateNr());
    phouse.addCar(car);

    phouse.addCar(new Car(LicensePlate.generateRandomPlateNr()));
    phouse.addCar(new Car(LicensePlate.generateRandomPlateNr(), 'truck'));
    phouse.addCar(new Car(LicensePlate.generateRandomPlateNr(), 'bike'));

    console.log("Cars inside the parking house:");
    phouse.print();

    Dates.sleep("Simulating car park for %s seconds", 10000);

    const cost = phouse.removeCar(car);

    console.log("Car " + car.licencePlateNr + " has left the parking house.");
    console.log("The cost is " + cost);
}


main();
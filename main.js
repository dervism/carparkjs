const ParkingHouse = require('./src/main/carpark/parkinghouse');
const Car = require('./src/main/carpark/car');
const LicensePlate = require('./src/main/carpark/licenseplate');
const Dates = require('./src/main/carpark/dates');

function main() {

    const phouse = new ParkingHouse(100);
    const car = new Car(LicensePlate.generateRandomPlateNr());
    phouse.parkCar(car);

    phouse.parkCar(new Car(LicensePlate.generateRandomPlateNr()));
    phouse.parkCar(new Car(LicensePlate.generateRandomPlateNr(), 'truck'));
    phouse.parkCar(new Car(LicensePlate.generateRandomPlateNr(), 'bike'));

    console.log("Cars inside the parking house:");
    phouse.print();

    Dates.sleep("Simulating car park for %s seconds", 10000);

    const cost = phouse.removeCar(car);

    console.log("Car " + car.licencePlateNr + " has left the parking house.");
    console.log("The cost is " + cost);
}


main();
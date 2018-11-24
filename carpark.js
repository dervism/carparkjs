const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static('site'));

/**
 * This code makes sure that our server converts the received
 * JSON data to JavaScript objects when calling "req.body".
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Import all the classes we need to use.
 */
const {Car, ParkingHouse, LicensePlate} = require('./src/main/carpark/index');

/**
 * Create a new ParkingHouse object.
 */
const parkingHouse = new ParkingHouse(1000);

/**
 * Listens to POST requests and creates new cars.
 */
app.post('/addCar', (req, res) => {
    // log request to server
    log("New car request received: %s", req.body);

    // extract the info from the request (the info entered by the user)
    const licenseNr = req.body.licenseNr || LicensePlate.generateRandomPlateNr();
    const type = req.body.type || 'car';

    // create a new Car object, and add it the list (parkingHouse object)
    const car = parkingHouse.parkCar(new Car(licenseNr, type));
    log("New car added to car park:", car);

    // respond a "HTTP 201 CREATED" status back to user.
    res.status(201).send(JSON.stringify(car));
});

/**
 * Responds a list of all the cars that are registered in
 * this car park.
 */
app.get('/parkedCars', (req, res) => {
    res.status(200).send(JSON.stringify(parkingHouse.allCars()));
});

/**
 * Starts a new server on the given port.
 */
app.listen(port, () => {
    console.log(`App started on http://localhost:${port}!`)
});

function log(msg, args) {
    console.log(msg, args);
}
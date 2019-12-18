const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

/**
 * This file is the main server script that starts
 * an ExpressJS http server. It will run the CarParkJS
 * frontend site that is accessible at http://localhost:3000.
 */

/**
 * Tells the Express-server were our website source files are.
 */
app.use(express.static('dist'));

/**
 * This code makes sure that our server converts the received
 * JSON data from the frontend to JavaScript. This will let
 * us get the data from a POST request.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Import all the classes we need to use in this file.
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
    log("New car request received: ", req.body);

    // extract the info from the request (the info entered by the user)
    const licenseNr = req.body.licenseNr || LicensePlate.generateRandomPlateNr();
    const type = req.body.type || 'car';

    // create a new Car object, and add it the list (parkingHouse object)
    const car = parkingHouse.addCar(new Car(licenseNr, type));
    log("New car added to car park:", car);

    // respond a "HTTP 201 CREATED" status back to user.
    // JSON.stringify will convert our object to a String.
    res.status(201).send(JSON.stringify(car));
});

/**
 * Responds a list of all the cars that are registered in
 * this car park.
 */
app.get('/cars', (req, res) => {
    res.status(200).send(JSON.stringify(parkingHouse.allCarsWithCostInfo()));
});


app.get('/cars/:licensePlateNr', (req, res) => {
    const licensePlateNr = req.params.licensePlateNr;
    if (parkingHouse.hasCar(licensePlateNr)) {
        res.status(200).send(JSON.stringify(parkingHouse.getCar(licensePlateNr)));
    } else {
        res.status(404).json({error: `${licensePlateNr} not found.`});
    }
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

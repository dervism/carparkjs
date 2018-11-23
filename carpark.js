const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static('site'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {Car, ParkingHouse, LicensePlate} = require('./src/main/carpark/index');
const parkingHouse = new ParkingHouse(1000);

app.post('/addCar', (req, res) => {
    console.log("Got: ", req.body);
    const licenseNr = req.body.licenseNr || LicensePlate.generateRandomPlateNr();
    const type = req.body.type || 'car';

    const car = parkingHouse.parkCar(new Car(licenseNr, type));
    console.log(car);
    res.status(201).send(JSON.stringify(car));
});

app.get('/parkedCars', (req, res) => {
    res.status(200).send(JSON.stringify(parkingHouse.allCars()));
});

app.listen(port, () => {
    console.log(`App started on http://localhost:${port}!`)
});

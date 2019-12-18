# CarParkJS

Example NodeJS/JavaScript (ES2018) project with classes and Jest-tests. The frontend is written in pure JavaScript.

The application has a JavaScript-based server backend included in this repo, and additionally a Java-based server [here](https://github.com/dervism/carpark-provider).

### Requirments:

- Node / NPM (v. 10 or newer)
- Git

You can install these with HomeBrew (https://brew.sh/):

`brew install npm` and
`brew install git`

If you want to test run the automatic accessibility tests, then you also need `ChromeDriver`:

`brew install chromedriver`

### Setup:

```
$ git checkout https://github.com/dervism/carparkjs.git
$ cd carparkjs
$ npm install
```

### Running the application without frontend:

Run the command in a terminal or command window to start a simulation of a parking house:

```
$ npm run start-cli
```

will output:

```
Cars inside the parking house:
Car { licencePlateNr: 'NW46421', type: '🚗' }
Car { licencePlateNr: 'GS77737', type: '🚗' }
Car { licencePlateNr: 'CL46232', type: '🚚' }
Car { licencePlateNr: 'WV91362', type: '🛵' }
Simulating car park for 10 seconds
Car NW46421 has left the parking house.
The cost is 51.75387326388889
```

### Running the application with a frontend:

Run the command in a terminal or command window:

```
$ npm run start
```

then go to http://localhost:3000. You will see the following simple interface:

![Screenshot](app.png)


### The application is tested with Jest:

To run all tests and test coverage:

```
$ npm test
```

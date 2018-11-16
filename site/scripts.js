
function handleForm() {
    const button = document.getElementById("addCarBtn");

    button.addEventListener("click", evt => {
        const licenseNr = document.getElementById("licenseNr").value;
        const type = document.getElementById("type").value;

        fetch("/addCar", {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({licenseNr, type})
        }).then(result => {
                makeCarList();
            });
    });
}

function makeCarList() {
    let element = document.createElement("ol");
    element.className = "list-group list-group-flush";

    getCars().then(cars => {
        if (cars.length > 0) {
            cars.forEach(car => {
                element.appendChild( createCar(car) )
            });
        } else {
            element = document.createElement("div");
            const carElement = document.createElement("h5");
            carElement.innerText = "No cars are parked.";
            element.appendChild(carElement);
        }

        const parkedCars = document.getElementById("parkedCars");
        if (parkedCars.childNodes.length > 0) parkedCars.removeChild(parkedCars.childNodes[0]);
        parkedCars.appendChild(element);
    });
}

function getCars() {
    return fetch("/parkedCars").then(result => {
        return result.json();
    });
}

function createCar(carObj) {
    const car = carObj.car;

    const carElement = document.createElement("li");
    carElement.className = "list-group-item d-flex w-100 justify-content-between";

    const carIcon = document.createElement("span");
    //carIcon.className = "border border-dark rounded-circle";
    //carIcon.style.padding = '2px';
    carIcon.innerText = car.type;

    const carLN = document.createElement("span");
    carLN.innerText = " " + car.licencePlateNr;

    const carHeader = document.createElement("div");
    carHeader.appendChild(carIcon);
    carHeader.appendChild(carLN);

    const carTime = document.createElement("small");
    carTime.innerText = "Parked " + Math.round(carObj.timeSpent[3]) + " seconds ago.";

    carElement.appendChild(carHeader);
    carElement.appendChild(carTime);

    return carElement;
}

handleForm();
makeCarList();
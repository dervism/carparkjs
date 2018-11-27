
function handleForm() {
    const button = document.getElementById("addCarBtn");

    button.addEventListener("click", evt => {
        const licenseNr = document.getElementById("licenseNr").value;
        const type = document.getElementById("type").value;

        fetch("/addCar", {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({licenseNr, type})
        })
        .then(result => {
            return result.json();
        })
        .then(car => {
            addToCarList(car);
        });
    });
}

function addToCarList(car) {
    let carList = createCarList();
    removeNoCarsItem();

    if (carList.childNodes.length > 0) carList.insertBefore(createCar(car), carList.childNodes[0]);
    else carList.appendChild(createCar(car));
}

function makeCarList() {
    let carList = createCarList();

    getCars().then(cars => {
        if (cars.length > 0) {
            cars.reverse().forEach(car => {
                carList.appendChild( createCar(car) )
            });
        } else {
            carList = document.createElement("div");
            const noCarsElement = document.createElement("h5");
            noCarsElement.setAttribute("id", "noCarsItem");
            noCarsElement.innerText = "No cars are parked.";
            carList.appendChild(noCarsElement);
        }

        const parkedCars = document.getElementById("parkedCars");
        parkedCars.appendChild(carList);
    });
}

function createCarList() {
    let carList = document.getElementById("carlist");
    if (carList) {
        return carList;
    }

    let newCarList = document.createElement("ol");
    newCarList.setAttribute("id", "carlist");
    newCarList.className = "list-group list-group-flush";

    const parkedCars = document.getElementById("parkedCars");
    parkedCars.appendChild(newCarList);

    return newCarList;
}

function removeNoCarsItem() {
    const noCarsItem = document.getElementById("noCarsItem");
    if (noCarsItem) noCarsItem.parentElement.removeChild(noCarsItem);
}

function getCars() {
    return fetch("/cars").then(result => {
        return result.json();
    });
}

function createCar(carObj) {
    const car = carObj.car;

    const animation = "animate fadeInDown one";
    const style = "list-group-item d-flex w-100 justify-content-between";

    const carElement = document.createElement("li");
    carElement.className = style + " " + animation;

    const carIcon = document.createElement("span");
    //carIcon.className = "border border-dark rounded-circle";
    //carIcon.style.padding = '2px';
    carIcon.innerText = car.type;

    const carLN = document.createElement("span");
    carLN.innerText = " " + car.licencePlateNr;

    const carHeader = document.createElement("div");
    carHeader.appendChild(carIcon);
    carHeader.appendChild(carLN);
    carElement.appendChild(carHeader);

    if (carObj.ticket && carObj.ticket.timeSpent) {
        const carTime = document.createElement("small");
        carTime.innerText = "Parked " + Math.round(carObj.ticket.timeSpent[3]) + "s ago.";
        carElement.appendChild(carTime);
    }

    return carElement;
}

handleForm();
makeCarList();
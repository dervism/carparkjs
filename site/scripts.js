
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
    console.log(car);
    let carlist = createCarList();
    removeNoCarsItem();

    if (carlist.childNodes.length > 0) carlist.insertBefore(createCar(car), carlist.childNodes[0]);
    else carlist.appendChild(createCar(car));
}

function makeCarList() {
    let element = createCarList();

    getCars().then(cars => {
        if (cars.length > 0) {
            cars.reverse().forEach(car => {
                element.appendChild( createCar(car) )
            });
        } else {
            element = document.createElement("div");
            const noCarsElement = document.createElement("h5");
            noCarsElement.setAttribute("id", "noCarsItem");
            noCarsElement.innerText = "No cars are parked.";
            element.appendChild(noCarsElement);
        }

        const parkedCars = document.getElementById("parkedCars");
        parkedCars.appendChild(element);
    });
}

function createCarList() {
    let carlist = document.getElementById("carlist");
    if (carlist) {
        return carlist;
    }

    let element = document.createElement("ol");
    element.setAttribute("id", "carlist");
    element.className = "list-group list-group-flush";

    const parkedCars = document.getElementById("parkedCars");
    parkedCars.appendChild(element);

    return element;
}

function removeNoCarsItem() {
    const noCarsItem = document.getElementById("noCarsItem");
    if (noCarsItem) noCarsItem.parentElement.removeChild(noCarsItem);
}

function getCars() {
    return fetch("/parkedCars").then(result => {
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

    const carTime = document.createElement("small");
    carTime.innerText = "Parked " + Math.round(carObj.timeSpent[3]) + " seconds ago.";

    carElement.appendChild(carHeader);
    carElement.appendChild(carTime);

    return carElement;
}

handleForm();
makeCarList();
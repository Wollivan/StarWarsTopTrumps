const SHIPS_API = `https://swapi.dev/api/starships/`;

// initialise
const app = document.getElementById("app");

let userHand = document.createElement("div");
userHand.classList.add("player-hand");
app.appendChild(userHand);

let cpuHand = document.createElement("div");
cpuHand.classList.add("cpu-hand");
app.appendChild(cpuHand);

let playerDeck = [];
let cpuDeck = [];

class Card {
    constructor(
        name,
        cargoCapacity,
        costInCredits,
        consumables,
        crew,
        hyperdriveRating,
        length,
        mglt
    ) {
        this.name = name;
        this.cargoCapacity = cargoCapacity;
        this.costInCredits = costInCredits;
        this.consumables = consumables;
        this.crew = crew;
        this.hyperdriveRating = hyperdriveRating;
        this.length = length;
        this.mglt = mglt;
    }
}

// api call
const getShips = () => {
    return axios
        .get(SHIPS_API)
        .then((res) => {
            const ships = res.data.results;
            // console.log(ships);
            const userData = ships.filter((_, i) => i % 2 === 0);
            const cpuData = ships.filter((_, i) => i % 2 !== 0);

            for (let i = 0; i < ships.length; i++) {
                // push half into playerDeck
                if (i % 2 === 0) {
                    let name = ships[i].name;
                    let cargoCapacity = ships[i].cargo_capacity;
                    let costInCredits = ships[i].cost_in_credits || 0;
                    let consumables = ships[i].consumables;
                    let crew = ships[i].crew;
                    let hyperdriveRating = ships[i].hyperdrive_rating;
                    let length = ships[i].length;
                    let mglt = ships[i].MGLT;
                    playerDeck.push(
                        new Card(
                            name,
                            cargoCapacity,
                            costInCredits,
                            consumables,
                            crew,
                            hyperdriveRating,
                            length,
                            mglt
                        )
                    );
                } else {
                    // and half into cpuDeck
                    let name = ships[i].name;
                    let cargoCapacity = ships[i].cargo_capacity;
                    let costInCredits = ships[i].cost_in_credits;
                    let consumables = ships[i].consumables;
                    let crew = ships[i].crew;
                    let hyperdriveRating = ships[i].hyperdrive_rating;
                    let length = ships[i].length;
                    let mglt = ships[i].MGLT;
                    cpuDeck.push(
                        new Card(
                            name,
                            cargoCapacity,
                            costInCredits,
                            consumables,
                            crew,
                            hyperdriveRating,
                            length,
                            mglt
                        )
                    );
                }
            }
        })
        .then(() => {
            displayShip(playerDeck[0], "player");
            displayShip(cpuDeck[0], "cpu");
        })
        .catch((err) => console.error(err));
};
getShips();

// display items
const displayShip = (ship, player) => {
    let cardContainer = document.createElement("div");
    let cardFront = document.createElement("article");
    let cardBack = document.createElement("article");
    let backImage = document.createElement("img");
    let backCaption = document.createElement("h2");
    let name = document.createElement("h3");
    // wrappers
    let cargoCapacity = document.createElement("div");
    let consumables = document.createElement("div");
    let costInCredits = document.createElement("div");
    let crew = document.createElement("div");
    let hyperdriveRating = document.createElement("div");
    let mglt = document.createElement("div");
    let length = document.createElement("div");

    // keys
    let cargoCapacityKey = document.createElement("span");
    let consumablesKey = document.createElement("span");
    let costInCreditsKey = document.createElement("span");
    let crewKey = document.createElement("span");
    let hyperdriveRatingKey = document.createElement("span");
    let mgltKey = document.createElement("span");
    let lengthKey = document.createElement("span");

    // values
    let cargoCapacityValue = document.createElement("span");
    let consumablesValue = document.createElement("span");
    let costInCreditsValue = document.createElement("span");
    let crewValue = document.createElement("span");
    let hyperdriveRatingValue = document.createElement("span");
    let mgltValue = document.createElement("span");
    let lengthValue = document.createElement("span");

    // add classes
    cardContainer.classList.add(`${player}-hand__card-container`);
    if (player === "cpu") {
        //Add active class so this starts facing away
        cardContainer.classList.add(`${player}-hand__card-container--active`);
    }
    cardFront.classList.add(`${player}-hand__card-front`);
    cardBack.classList.add(`${player}-hand__card-back`);
    backImage.classList.add(`${player}-hand__back-image`);
    backCaption.classList.add(`${player}-hand__back-caption`);
    name.classList.add(`${player}-hand__name`);
    cargoCapacity.classList.add(`${player}-hand__cargo-capacity`);
    consumables.classList.add(`${player}-hand__consumables`);
    costInCredits.classList.add(`${player}-hand__cost-in-credits`);
    crew.classList.add(`${player}-hand__crew`);
    hyperdriveRating.classList.add(`${player}-hand__hyperdrive-rating`);
    length.classList.add(`${player}-hand__length`);
    mglt.classList.add(`${player}-hand__mglt`);

    cargoCapacityKey.classList.add(`${player}-hand__key`);
    consumablesKey.classList.add(`${player}-hand__key`);
    costInCreditsKey.classList.add(`${player}-hand__key`);
    crewKey.classList.add(`${player}-hand__key`);
    hyperdriveRatingKey.classList.add(`${player}-hand__key`);
    lengthKey.classList.add(`${player}-hand__key`);
    mgltKey.classList.add(`${player}-hand__key`);

    cargoCapacityValue.classList.add(`${player}-hand__value`);
    consumablesValue.classList.add(`${player}-hand__value`);
    costInCreditsValue.classList.add(`${player}-hand__value`);
    crewValue.classList.add(`${player}-hand__value`);
    hyperdriveRatingValue.classList.add(`${player}-hand__value`);
    lengthValue.classList.add(`${player}-hand__value`);
    mgltValue.classList.add(`${player}-hand__value`);

    if (player === "player") {
        cardContainer;
        userHand.appendChild(cardContainer);
        cardContainer.appendChild(cardFront);
        cardContainer.appendChild(cardBack);
    } else {
        cpuHand.appendChild(cardContainer);
        cardContainer.appendChild(cardFront);
        cardContainer.appendChild(cardBack);
    }
    cardBack.appendChild(backImage);
    cardBack.appendChild(backCaption);
    cardFront.appendChild(name);

    cardFront.appendChild(cargoCapacity);
    cargoCapacity.appendChild(cargoCapacityKey);
    cargoCapacity.appendChild(cargoCapacityValue);

    cardFront.appendChild(costInCredits);
    costInCredits.appendChild(costInCreditsKey);
    costInCredits.appendChild(costInCreditsValue);

    cardFront.appendChild(consumables);
    consumables.appendChild(consumablesKey);
    consumables.appendChild(consumablesValue);

    cardFront.appendChild(crew);
    crew.appendChild(crewKey);
    crew.appendChild(crewValue);

    cardFront.appendChild(hyperdriveRating);
    hyperdriveRating.appendChild(hyperdriveRatingKey);
    hyperdriveRating.appendChild(hyperdriveRatingValue);

    cardFront.appendChild(length);
    length.appendChild(lengthKey);
    length.appendChild(lengthValue);

    cardFront.appendChild(mglt);
    mglt.appendChild(mgltKey);
    mglt.appendChild(mgltValue);

    // set values (this way, so we can manuplaute them to be different for crew and consumables)
    cargoCapacity.setAttribute("value", ship.cargoCapacity);
    costInCredits.setAttribute("value", ship.costInCredits);

    //Convert consumables to months
    if (ship.consumables.includes("year")) {
        consumables.setAttribute("value", parseInt(ship.consumables) * 12);
    } else if (ship.consumables.includes("week")) {
        consumables.setAttribute("value", parseInt(ship.consumables) / 4);
    } else if (ship.consumables.includes("month")) {
        consumables.setAttribute("value", parseInt(ship.consumables));
    } else if (ship.consumables.includes("days")) {
        consumables.setAttribute("value", parseInt(ship.consumables) / 7);
    }

    //Get huighest number, if its a range
    if (ship.crew.includes("-")) {
        crew.setAttribute("value", ship.crew.split("-")[1]);
    } else {
        crew.setAttribute("value", ship.crew);
    }
    hyperdriveRating.setAttribute("value", ship.hyperdriveRating);
    length.setAttribute("value", ship.length);
    mglt.setAttribute("value", ship.mglt);

    // add to page
    name.innerText = ship.name;
    backImage.setAttribute("src", "../assets/starwars-logo.png");
    backCaption.innerText = "Top Trumps";
    cargoCapacityKey.innerText = "Cargo Capacity";
    cargoCapacityValue.innerText = ship.cargoCapacity
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    +" kg"; //this funky code adds comma seperators

    costInCreditsKey.innerText = "Cost";
    costInCreditsValue.innerText =
        "₹" +
        ship.costInCredits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    consumablesKey.innerText = "Consumables";
    consumablesValue.innerText = ship.consumables;

    crewKey.innerText = "Max Crew";
    crewValue.innerText = ship.crew;

    hyperdriveRatingKey.innerText = "Hyperdrive Rating";
    hyperdriveRatingValue.innerText = ship.hyperdriveRating;

    lengthKey.innerText = "Length";
    lengthValue.innerText = ship.length + " m";

    mgltKey.innerText = "Speed";
    mgltValue.innerText = ship.mglt + " MGLT";

    // event listeners
    cargoCapacity.addEventListener("click", () => {
        // get answers
        let playerVal = parseInt(cargoCapacity.getAttribute("value"));
        let cpuVal = parseInt(
            document
                .querySelector(".cpu-hand__cargo-capacity")
                .getAttribute("value")
        );

        let statClass = "cargo-capacity";

        // compare answers
        if (playerVal > cpuVal) {
            cardSteal("player", statClass);
        } else if (cpuVal > playerVal) {
            cardSteal("cpu", statClass);
        } else {
            cardSteal("draw", statClass);
        }
    });
    costInCredits.addEventListener("click", () => {
        // get answers
        let playerVal = parseInt(costInCredits.getAttribute("value"));
        let cpuVal = parseInt(
            document
                .querySelector(".cpu-hand__cost-in-credits")
                .getAttribute("value")
        );

        let statClass = "cost-in-credits";

        // compare answers
        if (playerVal > cpuVal) {
            cardSteal("player", statClass);
        } else if (cpuVal > playerVal) {
            cardSteal("cpu", statClass);
        } else {
            cardSteal("draw", statClass);
        }
    });
    consumables.addEventListener("click", () => {
        // get answers
        let playerVal = parseInt(consumables.getAttribute("value"));
        let cpuVal = parseInt(
            document
                .querySelector(".cpu-hand__consumables")
                .getAttribute("value")
        );

        let statClass = "consumables";

        // compare answers
        if (playerVal > cpuVal) {
            cardSteal("player", statClass);
        } else if (cpuVal > playerVal) {
            cardSteal("cpu", statClass);
        } else {
            cardSteal("draw", statClass);
        }
    });
    crew.addEventListener("click", () => {
        // get answers
        let playerVal = parseInt(crew.getAttribute("value"));
        let cpuVal = parseInt(
            document.querySelector(".cpu-hand__crew").getAttribute("value")
        );

        let statClass = "crew";

        // compare answers
        if (playerVal > cpuVal) {
            cardSteal("player", statClass);
        } else if (cpuVal > playerVal) {
            cardSteal("cpu", statClass);
        } else {
            cardSteal("draw", statClass);
        }
    });
    hyperdriveRating.addEventListener("click", () => {
        // get answers
        let playerVal = parseInt(hyperdriveRating.getAttribute("value"));
        let cpuVal = parseInt(
            document
                .querySelector(".cpu-hand__hyperdrive-rating")
                .getAttribute("value")
        );

        let statClass = "hyperdrive-rating";

        // compare answers
        if (playerVal > cpuVal) {
            cardSteal("player", statClass);
        } else if (cpuVal > playerVal) {
            cardSteal("cpu", statClass);
        } else {
            cardSteal("draw", statClass);
        }
    });
    length.addEventListener("click", () => {
        // get answers
        let playerVal = parseInt(length.getAttribute("value"));
        let cpuVal = parseInt(
            document.querySelector(".cpu-hand__length").getAttribute("value")
        );

        let statClass = "length";

        // compare answers
        if (playerVal > cpuVal) {
            cardSteal("player", statClass);
        } else if (cpuVal > playerVal) {
            cardSteal("cpu", statClass);
        } else {
            cardSteal("draw", statClass);
        }
    });
    mglt.addEventListener("click", () => {
        // get answers
        let playerVal = parseInt(mglt.getAttribute("value"));
        let cpuVal = parseInt(
            document.querySelector(".cpu-hand__mglt").getAttribute("value")
        );

        let statClass = "mglt";

        // compare answers
        if (playerVal > cpuVal) {
            cardSteal("player", statClass);
        } else if (cpuVal > playerVal) {
            cardSteal("cpu", statClass);
        } else {
            cardSteal("draw", statClass);
        }
    });
};

let cardSteal = (winner, statClass) => {
    console.log(winner);
    //Reveal cpu card
    cpuCard = document.querySelector(".cpu-hand__card-container");
    cpuCard.classList.remove("cpu-hand__card-container--active");

    //Get each element to flash for a moment
    let playerStat = document.querySelector(`.player-hand__${statClass}`);
    let cpuStat = document.querySelector(`.cpu-hand__${statClass}`);

    if (winner === "player") {
        let losingCard = document.querySelector(".cpu-hand__card-container");
        //Flash the chosen category witha relevant color
        playerStat.classList.add("won");
        cpuStat.classList.add("lost");

        //Move winning card to back of deck and losing card to back of new deck
        playerDeck.push(playerDeck.splice(0, 1)[0]);
        playerDeck.push(cpuDeck.splice(0, 1)[0]);

        //Flip cards around
        setTimeout(() => {
            losingCard.classList.remove("player-hand__card-container--active");
        }, 2000);

        //Fade card into other deck
        setTimeout(() => {
            losingCard.classList.add("fade-left");
        }, 2000);
    } else if (winner === "cpu") {
        let losingCard = document.querySelector(".player-hand__card-container");
        //Flash the chosen category witha relevant color
        playerStat.classList.add("lost");
        cpuStat.classList.add("won");

        //Move winning card to back of deck and losing card to back of new deck
        cpuDeck.push(cpuDeck.splice(0, 1)[0]);
        cpuDeck.push(playerDeck.splice(0, 1)[0]);

        //Fade card into other deck
        setTimeout(() => {
            losingCard.classList.add("fade-right");
        }, 3500);
    }
    // console.log(playerDeck);
    // console.log(cpuDeck);

    // flip the cpu card back
    setTimeout(() => {
        document
            .querySelector(".cpu-hand__card-container")
            .classList.add(".cpu-hand__card-container--active");
    }, 4000);
    //Remove old card from front
    setTimeout(() => {
        document.querySelector(".player-hand__card-container").remove();
        document.querySelector(".cpu-hand__card-container").remove();
    }, 8000);
    // console.log(playerDeck[0]);

    setTimeout(() => {
        displayShip(playerDeck[0], "player");
        displayShip(cpuDeck[0], "cpu");
    }, 8000);
};
//Serve player a card, first from playerDeck
//let them select a category
//compare their a value to first in cpuDeck
//if higher, remove from cpuDeck and add to playerDeck, and vice versa
//set a state of "turn"
//if player's turn, let them choose again
//if cpu turn, select category based on
/*
if(cargoCapacity > 36000000) {

}else if(costInCredits > 150000000) {

}else if(consumables >= 24){ //converted to months

}else if (crew >= 165){

}else if(hyperdriveRating > 2) {

}else if (length >= 1600){

}else if (mglt >= 100)
*/

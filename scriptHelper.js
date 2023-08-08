// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.

    let missionDiv = document.getElementById("missionTarget");

    missionDiv.innerHTML = `<h2>Mission Destination</h2> 
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}"> `;


   
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   } else if (isNaN(testInput)) {
    return "Not a Number";
   } else {
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    if (validateInput(pilot) == "Empty" || validateInput(copilot) == "Empty" || 
        validateInput(fuelLevel) == "Empty" || validateInput(cargoLevel) == "Empty"){
        
        window.alert("All fields are required!");
    } else if (validateInput(pilot) == "Is a Number" || validateInput(copilot) == "Is a Number") {
        window.alert("Pilot and Co-pilot names must be strings!");
        
    } else if (validateInput(fuelLevel) == "Not a Number" || validateInput(cargoLevel) == "Not a Number") {
        window.alert("Fuel Level and Cargo Mass must be numbers!");
        
    } else {

        // list.style.visibility = "hidden";

        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");
        let launchHeading = document.getElementById("launchStatus");

        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

        if (fuelLevel < 10000) {
           
            list.style.visibility = "visible";
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            launchHeading.innerHTML = "Shuttle Not Ready for Launch";
            launchHeading.style.color = "rgb(199, 37, 78)";

            if (cargoLevel > 10000) {
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            } else {
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
            }
        }

        if (cargoLevel > 10000) {

            list.style.visibility = "visible";
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`            
            launchHeading.innerHTML = "Shuttle Not Ready for Launch";
            launchHeading.style.color = "rgb(199, 37, 78)";

            if (fuelLevel < 10000) {
                fuelStatus.innerHTML = "Fuel level too low for launch";
            } else {
                fuelStatus.innerHTML = "Fuel level high enough for launch";
            }
        }

        if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            list.style.visibility = "visible";

            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";

            launchHeading.innerHTML = "Shuttle is Ready for Launch";
            launchHeading.style.color = "rgb(65, 159, 106)";
        }

    }

    
    
}

async function myFetch() {
    // let planetsReturned;

    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {

        if (response.status >= 400) {
            throw new Error("Bad response");
        } else {
            return response.json();

        }


        });

    return planetsReturned;
}

function pickPlanet(planets) {

    let idx = Math.floor(Math.random() * planets.length);

    return planets[idx];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

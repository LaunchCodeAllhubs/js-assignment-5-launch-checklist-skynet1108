// Write your JavaScript code here!
require('isomorphic-fetch');


window.addEventListener("load", function() {

    let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()

   let listedPlanetsResponse;
   listedPlanetsResponse = myFetch();

   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
    //    console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let myPlanet = pickPlanet(listedPlanets);
        console.log(myPlanet.name);
        addDestinationInfo(document, myPlanet.name, myPlanet.diameter, myPlanet.star, myPlanet.distance, myPlanet.moons, myPlanet.image);
   })

    let list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";

    let pilotInput = document.querySelector("input[name=pilotName]");
    let copilotInput = document.querySelector("input[name=copilotName]");
    let fuelInput = document.querySelector("input[name=fuelLevel]");
    let cargoInput = document.querySelector("input[name=cargoMass]");


    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {

        event.preventDefault();

        formSubmission(document, list, pilotInput.value, copilotInput.value, fuelInput.value, cargoInput.value);
        

    })

   
   


    
    
   
});
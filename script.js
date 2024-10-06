const distanceSlider = document.getElementById("distanceRange");
const distanceOutput = document.getElementById("distanceLabel");
distanceOutput.innerHTML = distanceSlider.value;
distanceSlider.oninput = function() {
    distanceOutput.innerHTML = this.value;
}

const activitySlider = document.getElementById("activityRange");
const activityOutput = document.getElementById("activityLabel");
activityOutput.innerHTML = activitySlider.value;
activitySlider.oninput = function() {
    activityOutput.innerHTML = this.value;
}

const sizeSlider = document.getElementById("sizeRange");
const sizeOutput = document.getElementById("sizeLabel");
sizeOutput.innerHTML = sizeSlider.value;
sizeSlider.oninput = function() {
    sizeOutput.innerHTML = this.value;
}

const massSlider = document.getElementById("massRange");
const massOutput = document.getElementById("massLabel");
massOutput.innerHTML = massSlider.value;
massSlider.oninput = function() {
    massOutput.innerHTML = this.value;
}

const CO2Slider = document.getElementById("CO2Range");
const CO2Output = document.getElementById("CO2Label");
CO2Output.innerHTML = CO2Slider.value;
CO2Slider.oninput = function() {
    CO2Output.innerHTML = this.value;
}

const albedo = 0.3;
const stefan_Boltzmann_const = 5.67 * Math.pow(10, -8);
const universal_gravitational_const = 6.674 * Math.pow(10, -11);
const earthMass = 5.972 * Math.pow(10, 24);
let temperature;
let temperatureAtm;
let life = true;

const getTemp = function(CO2) { 
    let greenhouse = (4 * (136.2 + 0.044 * CO2));
    if (CO2 == 0) greenhouse = 0;
    return Math.round(Math.pow(((((activitySlider.value / Math.pow(distanceSlider.value, 2) ) * (1 - albedo)) + greenhouse) / (4 * stefan_Boltzmann_const)), 1/4));
}

const getG = function() {
    return ((universal_gravitational_const * massSlider.value * earthMass) / Math.pow((sizeSlider.value * 500), 2)) / 9.81; 
}

setInterval(function () {
    const tempLabel = document.getElementById("temp");
    const tempAtmsphereLabel = document.getElementById("tempatm");
    const gforceLabel = document.getElementById("gforce")
    const tempStatus = document.getElementById("tempStatus");
    const gravityStatus = document.getElementById("gravityStatus");
    const resultLabel = document.getElementById("survival");
    const image = document.getElementById("planet");
    
    noAtmsp = getTemp(0);
    yesAtmsp = getTemp(CO2Slider.value);

    tempLabel.innerHTML = "Average Global Temperature (without atmosphere): " + noAtmsp + "˚K" + " (" + (noAtmsp - 273) + "˚C)";
    tempAtmsphereLabel.innerHTML = "Average Global Temperature (with atmosphere): " + yesAtmsp + "˚K" + " (" + (yesAtmsp - 273) + "˚C)";;

    if (yesAtmsp - 273 < 0) {
        tempStatus.innerHTML = "Temperature too low!"; 
        tempCondition = false;
        tempAtmsphereLabel.style.color = "red";
        image.src = "snowball.png";
    }
    else if (yesAtmsp - 273 > 30) {
        tempStatus.innerHTML = "Temperature too high!"; 
        tempCondition = false;
        tempAtmsphereLabel.style.color = "red";
        image.src = "https://cdn2.picryl.com/photo/2019/06/27/l98-59b-198ad2-1024.png";
    }
    else {
        tempCondition = true;
        tempStatus.innerHTML = "";
        tempAtmsphereLabel.style.color = "green";
        image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png"; 
    }

    let gforce = getG();
    gforce = Math.round(gforce * 10) / 10;
    gforceLabel.innerHTML = "Gravitaional acceleration: " + gforce + "G";
    
    if (gforce > 4) {
        gravityStatus.innerHTML = "Gravity too strong!";
        gravityStatus.style.color = "red";
        gforceLabel.style.color = "red";
        gravityCondition = false;
    }
    else {
        gravityCondition = true;
        gravityStatus.innerHTML = "";
        gforceLabel.style.color = "green";
    }

    if (gravityCondition && tempCondition) life = true;
    else life = false;

    // if (tempCondition && life) {
    //     if (yesAtmsp - 273 < 10) {
    //         resultLabel.innerHTML = "Probably. It's a bit cold though.";
    //         resultLabel.style.color = "yellow";
    //     }
    //     else if (yesAtmsp - 273 > 20) {
    //         resultLabel.innerHTML = "Probably. It's a bit hot though.";
    //         resultLabel.style.color = "yellow";
    //     }
    //     else {} 
    //     if (gravityCondition) {
    //         if (gforce > 2) {
    //             resultLabel.innerHTML += "<br>The organs may have a hard time as well.";
    //             resultLabel.style.color = "yellow";
    //         }
    //         else if (gforce < 1) {
    //             resultLabel.innerHTML += "<br>The muscles and bones will deterioate but you'll be fine as long as you don't leave the planet.";
    //             resultLabel.style.color = "yellow";
    //         }
    //     }
    // }
    if (life) {
        resultLabel.innerHTML = "Yes";
        resultLabel.style.color = "green";
    }
    else {
        resultLabel.innerHTML = "No";
        resultLabel.style.color = "red";
    }
}, 100);
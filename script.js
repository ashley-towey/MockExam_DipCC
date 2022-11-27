/* Apparent Weather Predictor & Discombobulator */

// TRUE weather values
let temp = 0;    // temperature [in degrees]
let weather = "";   // weathercode [as a string]
let weatherText = "";

let json;

// starting colours
let bgCol = '#D3D3D3';
let cirCol = '#5A5A5A';
let textCol = '#000000';

// an array of values that will dislay the FALSE data
let wmoVals = [];
let a;
let falseTemp = 0; // initialise the wrong temperature

// x and y for animated circles/rain/snow
let x = 30;
let y = -600; 
let vel = 5;
let cirSize = 5;

function preload() {
  let url = "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,apparent_temperature,precipitation,weathercode&current_weather=true";
  json = loadJSON(url);
}

function setup() {
  createCanvas(600, 600);

  // choose a random WMO value from the wmoVals array
  wmoVals = [63, 3, 80, 61, 65, 0, 1, 2, 45, 48, 51, 53, 55, 81, 82, 95, 96, 99, 85, 86, 77, 71, 73, 75]; // an array of possible weathercode values to randomly pick from
  a = Math.round(random(0, wmoVals.length)); // calculate which wmoVal will be displayed

  // random FALSE temperature value rounded to 1 decimal place
  falseTemp = round(random(-10, 40), 1);

  // console information to check eveything is working
  console.log("Apparent Weather Predictor");
  console.log(json.current_weather.time); // check the time
  console.log(json.current_weather.temperature+"°"); // check the temperature
  console.log("WMO "+json.current_weather.weathercode); // check the weathercode
  console.log("False WMO "+wmoVals[a]);

  // mode initialisations
  noStroke();
  ellipseMode(CORNER);
  textSize(50);
}

function draw() {
  // IF mouse is pressed display the correct weather data
  // OTHERWISE display the wrong weather data
  if (mouseIsPressed === true) {
    trueWeather();
  } else {
    falseWeather();
  }

  if (weatherText === "Snow fall") {
    // animation with circles jittering like snow
    for(let i = 0; i < width; i++) {
      fill(255);
      ellipse(i, y+random(0, 1200), cirSize);
    }
  }
}

function trueWeather() {
  temp = json.current_weather.temperature; // get the temperature
  weather = json.current_weather.weathercode; // get weathercode

  convertWMO(); // convert WMO codes into readable text format

  // Display all the data we got from https://open-meteo.com/en
  background(bgCol); 
  fill(textCol); // text colour fill
  text(weatherText, 75, 525);
  let g = map(temp, 0, 40, 255, 0);
  let b = map(temp, 0, 40, 255, 0);
  fill(255, g, b); // false weather temp fill
  text(temp + "°", 450, 250);  
  fill(cirCol); // circle fill
  ellipse(40, 50, 375); // circle affected by weathercode data
}

function falseWeather() {
    // randomised temp and weathercode values
    weather = wmoVals[a];
    // weather = 96; // use to test weather values and colours

    convertWMO(); // convert WMO codes into readable text format

    background(bgCol);
    fill(textCol); // text colour fill
    text(weatherText, 75, 525);
    let falseG = map(falseTemp, 0, 40, 255, 0);
    let falseB = map(falseTemp, 0, 40, 255, 0);
    fill(255, falseG, falseB); // false weather temp fill
    text(falseTemp + "°", 450, 250);  
    fill(cirCol);
    ellipse(40, 50, 375);
}

// converting WMO codes to text & adding colour to reflect the apparent weather
function convertWMO() {
  if(weather === 61){
    weatherText = "Slight Rain";
    bgCol = '#536878'; 
    cirCol = '#6699cc';
    textCol = '#b7c9e2';
  } else if (weather === 63) {
    weatherText = "Moderate Rain"
    bgCol = '#536878'; 
    cirCol = '#152238';
    textCol = '#152238';
  } else if (weather === 65) {
    weatherText = "Heavy Rain";
    bgCol = '#152238'; 
    cirCol = '#536878';
    textCol = '#536878';
  } else if (weather === 0) {
    weatherText = "Clear Sky";
    bgCol = '#ADD8E6'; 
    cirCol = '#FFFF00';
    textCol = '#FF69B4';
  } else if (weather === 1 || weather === 2) {
    weatherText = "Partly Cloudy";
    bgCol = '#ADD8E6'; 
    cirCol = '#f8f8ff';
    textCol = '#f8f8ff';
  } else if (weather === 3) {
    weatherText = "Overcast";
    bgCol = '#949494'; 
    cirCol = '#D3D3D3';
    textCol = '#D3D3D3';
  } else if (weather === 45 || weather === 48) {
    weatherText = "Foggy";
    bgCol = '#FFFFFF'; 
    cirCol = '#F1F1F1';
    textCol = '#F1F1F1';
  } else if (weather === 51 || weather === 53 || weather === 55) {
    weatherText = "Drizzle";
    bgCol = '#536878'; 
    cirCol = '#ADD8E6';
    textCol = '#b7c9e2';
  } else if (weather === 80 || weather === 81) {
    weatherText = "Rain Showers";
    bgCol = '#536878'; 
    cirCol = '#6699cc';
    textCol = '#b7c9e2';
  } else if (weather === 82) {
    weatherText = "Violent Rain Showers";
    bgCol = '#0B0B45'; 
    cirCol = '#b7c9e2';
    textCol = '#b7c9e2';
  } else if (weather === 95 || weather === 96 || weather === 99) {
    weatherText = "Thunderstorms";
    bgCol = '#0B0B0B'; 
    cirCol = '#D3D3D3';
    textCol = '#FFFF00';
  } else if (weather === 85 || weather === 86 || weather === 77 || weather === 71 || weather === 73 || weather === 75){
    weatherText = "Snow fall";
    bgCol = '#D3D3D3'; 
    cirCol = '#FFFFFF';
    textCol = '#FFFFFF';
  }
}

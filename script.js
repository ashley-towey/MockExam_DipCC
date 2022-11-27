/* Apparent Weather Predictor & Discombobulator */

let appTemp = 0;    // apparent temperature [in degrees]
let rain = 0;       // precipitation [in millimetres]
let weather = "";   // weathercode [as a string]

let json;

let bgCol = '#D3D3D3'; 
let cirCol = '#5A5A5A';
let textCol = '#000000';

function preload() {
  // The URL for the JSON data (replace "imperial" with "metric" for celsius)
  let url = "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,apparent_temperature,precipitation,weathercode&current_weather=true";
  json = loadJSON(url);

}

function setup() {
  createCanvas(600, 600);

  temp = json.current_weather.temperature; // get the temperature
  weather = json.current_weather.weathercode; // get weathercode
  print(json.current_weather.time); // check the time

  // mode initialisation
  noStroke();
  ellipseMode(CORNER);

}

function draw() {
  background(200);
  fill(cirCol); // circle fill

  // testing out drawing the circle which will be affected by the weather code
  ellipse(40, 50, 375);

  convertWMO(); // convert WMO codes into readable text format

  // Display all the data we got from https://open-meteo.com/en
  textSize(50);
  fill(textCol); // text colour fill
  text(weatherText, 75, 525);
  text(temp + "°", 450, 250);
}

// converting WMO codes to text
function convertWMO() { 
  if(weather === 61){
    weatherText = "Slight Rain";
  } else if (weather === 63) {
    weatherText = "Moderate Rain"
  } else if (weather === 65) {
    weatherText = "Heavy Rain";
  } else if (weather === 0) {
    weatherText = "Clear Sky";
  } else if (weather === 1 || weather === 2) {
    weatherText = "Partly Cloudy";
  } else if (weather === 3) {
    weatherText = "Overcast";
  } else if (weather === 45 || weather === 48) {
    weatherText = "Foggy Conditions";
  } else if (weather === 51 || weather === 53 || weather === 55) {
    weatherText = "Drizzle";
  } else if (weather === 80 || weather === 81) {
    weatherText = "Rain Showers";
  } else if (weather === 82) {
    weatherText = "Violent Rain Showers";
  } else if (weather === 95 || weather === 96 || weather === 99) {
    weatherText = "Thunderstorms";
  }
}

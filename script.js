/* Apparent Weather Predictor & Discombobulator */

let appTemp = 0;    // apparent temperature [in degrees]
let rain = 0;       // precipitation [in millimetres]
let weather = "";   // weathercode [as a string]

let json;

function preload() {
  // The URL for the JSON data (replace "imperial" with "metric" for celsius)
  let url = "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,apparent_temperature,precipitation,weathercode&current_weather=true";
  json = loadJSON(url);

}

function setup() {
  createCanvas(600, 600);

  temp = json.current_weather.temperature; // get the temperature
  weather = json.current_weather.weathercode; // get weathercode
}

function draw() {
  background(200);
  fill(0);

  // testing out drawing the circle which will be affected by the weather code
  ellipse(250, 250, 375);

  convertWMO(); // convert WMO codes into readable text format

  // Display all the data we got from https://open-meteo.com/en
  text("City: London", 10, 50);
  text("Temperature: " + temp, 10, 70);
  text("Weathercode: " + weatherText, 10, 90);
}

function convertWMO() {
  // converting WMO codes to text
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

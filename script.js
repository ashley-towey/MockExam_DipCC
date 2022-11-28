/* Apparent Weather Predictor [aka The Discombobulator] */
/* Created by Ashley Towey [0220201] for CCI Mock Exam */

// TRUE weather values
let temp = 0;    // temperature [in degrees]
let weather = "";   // weathercode [as a string]
let weatherText = ""; // weathercode text [as a string]
let rain = 0; // rain [in millimetres]
let apparentTemp = 0; // apparent temperature [in degrees]

// time variables to count through the array of 168 total values 
let currentTime;
let totalTimes;
let jsonTimeDate;

// starting/base colours
let bgCol = '#D3D3D3';
let cirCol = '#5A5A5A';
let textCol = '#000000';

// an array of values that will dislay the FALSE data
let wmoVals = [];
let a; // used to count through wmoVals
let falseTemp = 0; // initialise the wrong temperature
let falseApparentTemp = 0; // intitialise the apparent false temperature

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
  createCanvas(600, 800);

  // choose a random WMO value from the wmoVals array
  wmoVals = [63, 3, 80, 61, 65, 0, 1, 2, 45, 48, 51, 53, 55, 81, 82, 95, 96, 99, 85, 86, 77, 71, 73, 75]; // an array of possible weathercode values to randomly pick from
  a = Math.round(random(0, wmoVals.length)); // calculate which wmoVal will be displayed

  // random FALSE temperature value rounded to 1 decimal place
  falseTemp = round(random(-10, 40), 1);
  falseApparentTemp = falseTemp + round(random(-3, 3));

  // console information to check eveything is working
  console.log("Apparent Weather Predictor");
  // let jsonTimeDate = json.current_weather.time; // get the time and data value
  // let dateTime = jsonTimeDate.split("T"); // split the date and time by "T"
  // console.log(dateTime[0]); // check the date
  // console.log(dateTime[1]); // check the time
  console.log("Latitude "+json.latitude); // check latitude
  console.log("Longitude "+json.longitude); // check longitude
  console.log(json.current_weather.temperature+"°"); // check the temperature
  console.log("WMO "+json.current_weather.weathercode); // check the weathercode
  console.log("False WMO "+wmoVals[a]); // check the wrong WMO

  // checking what the time and date are to check against what number in the array
  // console.log("date/time: "+jsonTimeDate);
  // let totalTimes = json.hourly.time;
  // let currentTime = totalTimes.indexOf(jsonTimeDate);
  // console.log("Number of current time in array: " + currentTime);
  // console.log("check against time/date above: "+totalTimes[currentTime]);

  // mode initialisations
  noStroke();
  ellipseMode(CORNER);
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
      ellipse(i, y+random(0, height*2), cirSize);
    }
  }
  // Write the title sequence
  fill(textCol);
  text("Apparent Weather \nForecast", 50, 80);
}

function trueWeather() {
  jsonTimeDate = json.current_weather.time; // get the time and data value
  totalTimes = json.hourly.time;
  currentTime = totalTimes.indexOf(jsonTimeDate);
  console.log(currentTime);

  temp = json.current_weather.temperature; // get the temperature
  weather = json.current_weather.weathercode; // get weathercode
  rain = json.hourly.precipitation; // get rain
  apparentTemp = json.hourly.apparent_temperature; // get the apparent temperature

  convertWMO(); // convert WMO codes into readable text format

  // Display all the data we got from https://open-meteo.com/en
  background(bgCol); 
  fill(textCol); // text colour fill
  text(weatherText, 75, 525+150);
  let g = map(temp, 0, 40, 255, 0);
  let b = map(temp, 0, 40, 255, 0);
  fill(255, g, b); // false weather temp fill
  text(temp + "°", 450, 400);  
  text(apparentTemp[currentTime]+"°", 450, 320+150);
  fill(cirCol); // circle fill
  ellipse(40, 200, 375); // circle affected by weathercode data
  textSize(15);
  text("* true weather (ish)", 300, 150);
  // check if there is any rain before adding millimetres
  if(rain[currentTime] > 0.0){
    textSize(15);
    text(rain[currentTime] + "mm", 100, 560+150); // write the rain
  }
  textSize(50);
}

function falseWeather() {
    // randomised temp and weathercode values
    weather = wmoVals[a];
    // weather = 85; // USE to TEST weather values and colours

    convertWMO(); // convert WMO codes into readable text format

    background(bgCol);
    fill(textCol); // text colour fill
    text(weatherText, 75, 525+150);
    let falseG = map(falseTemp, 0, 40, 255, 0);
    let falseB = map(falseTemp, 0, 40, 255, 0);
    fill(255, falseG, falseB); // false weather temp fill
    text(falseTemp + "°", 450, 400);  
    text(falseApparentTemp + "°", 450, 320+150);
    fill(cirCol);
    ellipse(40, 200, 375);
    textSize(15);
    text("* false weather", 300, 150);
    textSize(50);
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

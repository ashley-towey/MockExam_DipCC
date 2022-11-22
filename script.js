    // trying to load the weather api
    let weatherurl = "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,apparent_temperature,precipitation,rain,weathercode,windspeed_10m,winddirection_10m";
    loadJSON(weatherurl); 

let weatherjson = false; 

function setup() {
    createCanvas(400, 400);

}

function draw() {
    background(150);

    // If the JSON hasn't loaded then don't go any further
    if(weatherjson===false) return;

    print('weatherjson has loaded');

    // Otherwise get the date, temp, and rain
    let temp = weatherjson.hourly.temperature_2m;
    let rain = weatherjson.hourly.rain;

    fill(255);
    text(` Temp:  ${temp}°C`, 100, 100);
    text(`  Rain:  ${rain}mm`, 100, 150);

}
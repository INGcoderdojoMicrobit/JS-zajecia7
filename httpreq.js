const https = require('https');
const request = require('request');

//http.get('http://192.168.0.143/api', (resp) => {

var OWMAPPID = "dea49c5dbe5ecf2f3b3d6ed074766ee2"
var accuAPIID = "MOVo4OIH5KgNohU1JXHgHI2J7pMHB3Io"
var NASAAPPID = "Nzei0jlJaiJzcmlX5vxdCRB3TOMBFEazgudEUn32"
var sWynik=""

function OpenWeatherMap(sCity){
    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${sCity}&appid=${OWMAPPID}&lang=pl&units=metric`, (resp) => {

    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
            //console.log(data);
            let oPogoda = JSON.parse(data);
            //console.log(oPogoda);
            console.log(sCity);
            console.log(`temperatura: ${oPogoda.main.temp}°C, temperatura odczuwalna: ${oPogoda.main.feels_like}°C, temp min: ${oPogoda.main.temp_min}°C, temp max: ${oPogoda.main.temp_max}°C`);
            console.log(`ciśnienie: ${oPogoda.main.pressure}hPa, wilgotność: ${oPogoda.main.humidity}`);
            console.log(`widoczność: ${oPogoda.visibility}m`);
            
            console.log(`http://openweathermap.org/img/w/${oPogoda.weather[0].icon}.png`)
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}



function AccuWeatherLocations(country){

    https.get(`https://dataservice.accuweather.com/locations/v1/adminareas/pl?apikey=${accuAPIID}&language=pl`, (resp) => {

    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
            console.log(data);
            let oWojewodztwa = JSON.parse(data);
            console.log(oWojewodztwa);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

function AccuWeatherCitySearch(city,wojew){

    https.get(`https://dataservice.accuweather.com/locations/v1/cities/pl/${wojew}/search?apikey=${accuAPIID}&q=${city}&language=pl`, (resp) => {

    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
            console.log(data);
            let oMiasto = JSON.parse(data);
            console.log(oMiasto);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}


function AccuWeather1hForecast(cityID){

    https.get(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${cityID}?apikey=${accuAPIID}&language=pl&metric=true`, (resp) => {

    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
            console.log(data);
            let o1hForecast = JSON.parse(data);
            console.log(o1hForecast);
            //console.log(`widoczność: ${oPogoda.visibility}m`);
            sWynik = o1hForecast;
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}


function GoogleTranslate(sTekst, sSourceLang, sTargetLang){

    https.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sSourceLang}&tl=${sTargetLang}&dt=t&q="${encodeURI(sTekst)}`, (resp) => {

    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
            //console.log(data);
            let oWynik = JSON.parse(data);
            oWynik[0].forEach(element => {
                console.log(element[0])
            });
            //console.log(oWynik);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}




function NasaAPI(){
    
    request(`https://api.nasa.gov/planetary/earth/assets?lon=18.947329&lat=50.193520&date=2021-04-10&dim=0.20&api_key=${NASAAPPID}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    });

    request(`https://api.nasa.gov/planetary/apod?api_key=${NASAAPPID}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body.url);
            GoogleTranslate(body.explanation, "auto", "pl")
    });
        
}


//wyświeltamy - parametry funkcji:
// tabelka -> tablica z wynikami
// false -> opis pod histogramem z CYFEREK, true -> opis z LITEREK
// włączamy funkcję ryzującą harmonogram
var api2 = require('./histogram');

function ThingSpeakAPI(){

    request('https://api.thingspeak.com/channels/730056/feeds.json', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    //console.log(body.feeds);
    tab = [];
    for(iIter1 = 0; iIter1<100; iIter1++){
       tab.push(Math.floor(parseInt(body.feeds[iIter1].field3)));
    }
    
    console.log(`rozkład PM10 Katowice Zarzecze - względem 70`);
    api2.RysujHistogram(tab, false, 0, 70)
    //console.log(body.channel);
    });

}



function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
    

//AccuWeatherLocations("pl") //Polska
//AccuWeatherCitySearch("Katowice",24) //24 - śląskie
//AccuWeather1hForecast(275781) //275781 - Katowice

OpenWeatherMap("Katowice")

OpenWeatherMap("Szczecin")

GoogleTranslate("get your ass here and stop fighiting me", "auto", "pl")

NasaAPI();
ThingSpeakAPI();
//console.log(`wynik=${sWynik}`)


      
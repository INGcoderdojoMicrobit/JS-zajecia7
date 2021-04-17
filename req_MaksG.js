// MaksG - zabawy z REST API

const https = require('https');
const http = require('http');
const request = require('request');

let OWMAPPID = "dea49c5dbe5ecf2f3b3d6ed074766ee2"
let accuAPIID = "MOVo4OIH5KgNohU1JXHgHI2J7pMHB3Io"
let NASAAPPID = "Nzei0jlJaiJzcmlX5vxdCRB3TOMBFEazgudEUn32"
let sWynik=""
//Amogus
function OpenWeatherMap(sCity){

    request(`https://api.openweathermap.org/data/2.5/weather?q=${sCity}&appid=${OWMAPPID}&lang=pl&units=metric`, (err, res, body) => {
        console.log(body);
        let oPogoda = JSON.parse(body);
        console.log(oPogoda);

        console.log("openweather-> "+sCity);
        console.log(`openweather-> temperatura: ${oPogoda.main.temp}°C, temperatura odczuwalna: ${oPogoda.main.feels_like}°C, temp min: ${oPogoda.main.temp_min}°C, temp max: ${oPogoda.main.temp_max}°C`);
        console.log(`openweather-> ciśnienie: ${oPogoda.main.pressure}hPa, wilgotność: ${oPogoda.main.humidity}`);
        console.log(`openweather-> widoczność: ${oPogoda.visibility}m`);
        console.log(`openweather-> http://openweathermap.org/img/w/${oPogoda.weather[0].icon}.png`)
    });
}

function RestCountriesAPI(sCountry){

    request(`https://restcountries.eu/rest/v2/name/${sCountry}`, (err, res, body) => {
        console.log(body);
        let oCountry = JSON.parse(body);
        console.log(oCountry);

        console.log(`restcountries-> nazwy: ${oCountry[0].altSpellings}`);
        console.log(`restcountries-> stolica: ${oCountry[0].capital}`);
        console.log(`restcountries-> powierzchnia: ${oCountry[0].area}m2`);
        console.log(`restcountries-> położenie: ${oCountry[0].subregion}`);
        console.log(`restcountries-> strefy czasowe: ${oCountry[0].timezones}`)
    });
}

function openlibraryISBN(sISBN){

    request(`https://openlibrary.org/isbn/${sISBN}.json`, (err, res, body) => {
        let oLibrary = JSON.parse(body);

        console.log(`openLibraryISBN-> tytuł: ${oLibrary.title}`)
        openlibraryWorks(oLibrary.works[0].key) 

    });
}

function openlibraryWorks(sWorks){

    request(`https://openlibrary.org${sWorks}.json`, (err, res, body) => {
        let oWorks = JSON.parse(body);

        console.log(`openLibraryWorks-> opis: ${oWorks.description}`)
        console.log(`openLibraryWorks-> autorzy: ${oWorks.authors[0].author.key}`)
        openlibraryAuthor(oWorks.authors[0].author.key);
    });
}

function openlibraryAuthor(sAuthor){

    request(`https://openlibrary.org${sAuthor}.json`, (err, res, body) => {
        let oAuthor = JSON.parse(body);
        
        console.log(`openLibraryAuthor-> imię i nazwisko: ${oAuthor.name}, pełne ${oAuthor.fuller_name}`)
    });
}



openlibraryISBN("9788324403875")
//RestCountriesAPI("Germany")

///OpenWeatherMap('Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch')

//OpenWeatherMap('Amorgos')
//https://www.youtube.com/watch?v=dQw4w9WgXcQ

//OpenWeatherMap("Katowice")

//OpenWeatherMap("Szczecin")



// https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${cityID}?apikey=${accuAPIID}&language=pl&metric=true
// console.log(`AccuWeather-> temp:${o1hForecast[0].Temperature.Value}°${o1hForecast[0].Temperature.Unit}, link: ${o1hForecast[0].MobileLink}`);
// console.log(`AccuWeather-> icon: https://www.accuweather.com/images/weathericons/${o1hForecast[0].WeatherIcon}.svg`);
        

//https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sSourceLang}&tl=${sTargetLang}&dt=t&q="${encodeURI(sTekst)}

//https://api.nasa.gov/planetary/earth/assets?lon=18.947329&lat=50.193520&date=2021-04-10&dim=0.20&api_key=${NASAAPPID}

// https://api.nasa.gov/planetary/apod?api_key=${NASAAPPID}

//https://api.thingspeak.com/channels/730056/feeds.json

//https://freegeoip.app/json/

//https://restcountries.eu/#api-endpoints-all    
//https://restcountries.eu/rest/v2/name/${sName}
//https://restcountries.eu/rest/v2/all

//https://openlibrary.org/dev/docs/api/books   
//https://openlibrary.org/isbn/${sISBN}.json

//https://api.ipify.org/?format=json

//https://ipinfo.io/161.185.160.93/geo    

//http://api.zippopotam.us/pl/40-748
//http://www.zippopotam.us/
//http://api.zippopotam.us/${sKraj}/${sKodPoczt}

//https://www.boredapi.com/
//https://www.boredapi.com/api/activity?participants=1
//https://www.boredapi.com/api/activity?participants=${iIleOsob}

 //https://api.publicapis.org/entries
 // Amogus
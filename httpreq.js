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
            console.log("openweather-> "+sCity);
            console.log(`openweather-> temperatura: ${oPogoda.main.temp}°C, temperatura odczuwalna: ${oPogoda.main.feels_like}°C, temp min: ${oPogoda.main.temp_min}°C, temp max: ${oPogoda.main.temp_max}°C`);
            console.log(`openweather-> ciśnienie: ${oPogoda.main.pressure}hPa, wilgotność: ${oPogoda.main.humidity}`);
            console.log(`openweather-> widoczność: ${oPogoda.visibility}m`);
            
            console.log(`openweather-> http://openweathermap.org/img/w/${oPogoda.weather[0].icon}.png`)
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
            console.log(`AccuWeather-> ${oWojewodztwa}`);
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
            //console.log(data);
            let oMiasto = JSON.parse(data);
            console.log(`AccuWeather-> ${oMiasto}`);
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
            console.log(`AccuWeather-> temp:${o1hForecast[0].Temperature.Value}°${o1hForecast[0].Temperature.Unit}, link: ${o1hForecast[0].MobileLink}`);
            console.log(`AccuWeather-> icon: https://www.accuweather.com/images/weathericons/${o1hForecast[0].WeatherIcon}.svg`);
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
    console.log("NASA-> "+ body.url);
    });

    request(`https://api.nasa.gov/planetary/apod?api_key=${NASAAPPID}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log("NASA-> "+ body.url);
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
    
    console.log(`Thingspeak -> rozkład PM10 Katowice Zarzecze - względem 70`);
    api2.RysujHistogram(tab, false, 0, 70)
    //console.log(body.channel);
    });

}



function GeoIPAPI(){
    
    request(`https://freegeoip.app/json/`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(`freegeoIP -> IP:${body.ip} kraj:${body.country_name}, region:${body.region_name}`);
    });
}


function CountriesAPI(){
//https://restcountries.eu/#api-endpoints-all    
    request(`https://restcountries.eu/rest/v2/all`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        body.forEach(element => {
            if (Math.random()*100<5) console.log(`restcountries-> kraj:${element.name} stolica:${element.capital}, region:${element.region}`);    
        });
    });
}

function CountryAPI(sName){
    
    request(`https://restcountries.eu/rest/v2/name/${sName}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(`restcountries-> kraj:${body[0].name} stolica:${body[0].capital}, populacja:${body[0].population}`);    
    });
}


function BooksISBNAPI(sISBN){
//https://openlibrary.org/dev/docs/api/books    
    let sAuthor="";
    request(`https://openlibrary.org/isbn/${sISBN}.json`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        sAuthor = body.authors[0].key;
        console.log(`openlibrabry-> Tytuł:${body.title}, ID autora: ${sAuthor}`);    
    });
}


function IPFyAPI(){
    //https://api.ipify.org/?format=json
        request(`https://api.ipify.org/?format=json`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(`IPfy-> IP:${body.ip}`);    
        });
    }

function IPinfoAPI(sIP){
    //https://ipinfo.io/161.185.160.93/geo    
        request(`https://ipinfo.io/${sIP}/geo`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(`IPinfo-> miasto:${body.city}, lokalizacja: ${body.loc}, państwo: ${body.country} `);    
        });
}

function ZippoAPI(sKodPoczt, sKraj){
    //http://api.zippopotam.us/pl/40-748
    //http://www.zippopotam.us/
        request(`http://api.zippopotam.us/${sKraj}/${sKodPoczt}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(`zippo-> miasto:${body.places[0]["place name"]}, region:${body.places[0].state}`);    
        });
}

function BoredAPI(iIleOsob){
    //https://www.boredapi.com/
    //https://www.boredapi.com/api/activity?participants=1
            request(`https://www.boredapi.com/api/activity?participants=${iIleOsob}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(`Bored-> co robic:${body.activity}, link:${body.link}`);    
        });
}


function PublicAPI(){
    //https://api.publicapis.org/entries
    request(`https://api.publicapis.org/entries`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            body.entries.forEach(element => {
                if (Math.random()*100<2) console.log(`publicapis-> API:${element.API}, opis:${element.Description}, link:${element.Link}`);    
            });
        });
}




function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
    


  //lista api -> https://api.publicapis.org/entries

//AccuWeatherLocations("pl") //Polska
//AccuWeatherCitySearch("Katowice",24) //24 - śląskie

//tylko 50 wywołań dziennie
//AccuWeather1hForecast(275781) //275781 - Katowice

OpenWeatherMap("Katowice")

OpenWeatherMap("Szczecin")

GoogleTranslate("dragonfly is creeping into the wild forest", "auto", "pl")

NasaAPI();
ThingSpeakAPI();
GeoIPAPI();
IPFyAPI();
CountriesAPI();
CountryAPI("poland")
BooksISBNAPI("9788366573536")
IPinfoAPI("91.201.120.214");
ZippoAPI("40-748","pl")
BoredAPI(1)
PublicAPI()
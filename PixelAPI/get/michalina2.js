/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca najmniejsza wspólna wielokrotność liczb x i y przy pomocy wołania API zwracającego NWD

*/

const {port, klucz} = require('../config.json');
const request = require('request');

let OWMAPPID = "dea49c5dbe5ecf2f3b3d6ed074766ee2"


/*

let accuAPIID = "MOVo4OIH5KgNohU1JXHgHI2J7pMHB3Io"
let NASAAPPID = "Nzei0jlJaiJzcmlX5vxdCRB3TOMBFEazgudEUn32"
let sWynik=""
//Amogus
function OpenWeatherMap(sCity){

    request(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(sCity)}&appid=${OWMAPPID}&lang=pl&units=metric`, (err, res, body) => {
        console.log(body);
        let oPogoda = JSON.parse(body);
        console.log(oPogoda);

        console.log(`openweather-> ${sCity}, zakodowany URL = ${encodeURI(sCity)}`);
        console.log(`openweather-> temperatura: ${oPogoda.main.temp}°C, temperatura odczuwalna: ${oPogoda.main.feels_like}°C, temp min: ${oPogoda.main.temp_min}°C, temp max: ${oPogoda.main.temp_max}°C`);
        console.log(`openweather-> ciśnienie: ${oPogoda.main.pressure}hPa, wilgotność: ${oPogoda.main.humidity}`);
        console.log(`openweather-> widoczność: ${oPogoda.visibility}m`);
        console.log(`openweather-> http://openweathermap.org/img/w/${oPogoda.weather[0].icon}.png`)
    });
}

*/


function fetch(sCity) {
    return new Promise(function (resolve, reject) {
        let result;
        //wywołujemy API
        //request(`http://localhost:${port}/euklides?key=${encodeURI(klucz)}&x=${x}&y=${y}&rekur=false`, (err, res, body) => {

        request(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(sCity)}&appid=${OWMAPPID}&lang=pl&units=metric`, (err, res, body) => {
            
            if (err || res.statusCode === 404)
            {
                console.log(`err=${err}`); //w body zawarty jest string zwrócony przez wywoływane API 
                console.log(`body=${body}`); //w body zawarty jest string zwrócony przez wywoływane API 
                if (res.statusCode === 404) err = body;
                reject(err); //jeśli jest błąd - musimy wywołać funkcję "reject"
            }
            else 
            {
                console.log(`body=${body}`); //w body zawarty jest string zwrócony przez wywoływane API 
                console.log(`res=${res}`); //w body zawarty jest string zwrócony przez wywoływane API 
                console.log(`err=${err}`); //w body zawarty jest string zwrócony przez wywoływane API 
                
                let oPogoda = JSON.parse(body); // zaminiamy go na obiekt (parsujemy JSON)
                console.log(`bodyJSON=${oPogoda}`); 
                
                console.log(`openweather-> temperatura: ${oPogoda.main.temp}°C, temperatura odczuwalna: ${oPogoda.main.feels_like}°C, temp min: ${oPogoda.main.temp_min}°C, temp max: ${oPogoda.main.temp_max}°C`);
                console.log(`openweather-> ciśnienie: ${oPogoda.main.pressure}hPa, wilgotność: ${oPogoda.main.humidity}`);
                console.log(`openweather-> widoczność: ${oPogoda.visibility}m`);
                                
                result = oPogoda.main.temp; // pobieramy odpowiednią interesującą nas wartość
                console.log(`result=${result}`);
                resolve(result); // aby zwrócić poprawnie wynik zamiast return stosujemy funkcję "resolve"
            }
        });
    });
}



exports.path = "/temperatura";

exports.execute = async function (req, res) {
      
    
    let city = req.query.city;
    if (!req.query.city)
        return res.send({ ok: false, message: "Podaj argument city - miasto w ktorym badamy temperature" });
    
    let temp;
    try 
    {
        temp = await fetch (city) //tutaj stosujemy "await" - który pozwala nam zaczekać aż się skończy działanie funkcji fetch
    } catch(err) 
    {
        // catches errors both in fetch and response.json
        res.send({
            ok: false,
            error: err
        });
        return 0;
    }
      
    res.send({
            ok: true,
            miasto: city,
            temperatura: temp
    });
};
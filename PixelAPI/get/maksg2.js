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


function fetch(sImie) {
    return new Promise(function (resolve, reject) {
        let result;
        //wywołujemy API
        //request(`http://localhost:${port}/euklides?key=${encodeURI(klucz)}&x=${x}&y=${y}&rekur=false`, (err, res, body) => {

        //https://api.genderize.io/?name=adam
        //{"name":"adam","gender":"male","probability":0.98,"count":116396}


        request(`https://api.genderize.io/?name=${encodeURI(sImie)}`, (err, res, body) => {
            
            if (err) 
            {
                reject(err); //jeśli jest błąd - musimy wywołać funkcję "reject"
            }
            else 
            {
                console.log(`body=${body}`); //w body zawarty jest string zwrócony przez wywoływane API 
                let oImie = JSON.parse(body); // zaminiamy go na obiekt (parsujemy JSON)
                console.log(`bodyJSON=${oImie}`); 
                
                //console.log(`openweather-> temperatura: ${oPogoda.main.temp}°C, temperatura odczuwalna: ${oPogoda.main.feels_like}°C, temp min: ${oPogoda.main.temp_min}°C, temp max: ${oPogoda.main.temp_max}°C`);
                //console.log(`openweather-> ciśnienie: ${oPogoda.main.pressure}hPa, wilgotność: ${oPogoda.main.humidity}`);
                //console.log(`openweather-> widoczność: ${oPogoda.visibility}m`);
                                
                result = oImie.gender; // pobieramy odpowiednią interesującą nas wartość
                console.log(`result=${result}`);
                resolve(result); // aby zwrócić poprawnie wynik zamiast return stosujemy funkcję "resolve"
            }
        });
    });
}



exports.path = "/gender";

exports.execute = async function (req, res) {
      
    
    let imie = req.query.imie;
    if (!req.query.imie)
        return res.send({ ok: false, message: "Podaj argument imie - dla którego sprawdzimy płeć" });
    
    let gender = await fetch (imie) //tutaj stosujemy "await" - który pozwala nam zaczekać aż się skończy działanie funkcji fetch

    res.send({
            ok: true,
            imie: imie,
            plec: gender
    });
};
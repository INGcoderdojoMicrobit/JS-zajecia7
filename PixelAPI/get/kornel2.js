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


function fetch(sWaluta) {
    return new Promise(function (resolve, reject) {
        let result;
        //wywołujemy API
        
        //http://api.nbp.pl/api/exchangerates/rates/a/chf?format=JSON
        //{"table":"A","currency":"frank szwajcarski","code":"CHF","rates":[{"no":"092/A/NBP/2021","effectiveDate":"2021-05-14","mid":4.1413}]}
        request(`http://api.nbp.pl/api/exchangerates/rates/a/${sWaluta}?format=JSON`, (err, res, body) => {
            
            if (err) 
            {
                reject(err); //jeśli jest błąd - musimy wywołać funkcję "reject"
            }
            else 
            {
                console.log(`body=${body}`); //w body zawarty jest string zwrócony przez wywoływane API 
                let oKurs = JSON.parse(body); // zaminiamy go na obiekt (parsujemy JSON)
                console.log(`bodyJSON=${oKurs}`); 
                console.log(`nbpapicurrencyex-> waluta: ${sWaluta}, nazwa:${oKurs.currency}, kurs:${parseFloat(oKurs.rates[0].mid)}`);
                result = parseFloat(oKurs.rates[0].mid); // pobieramy odpowiednią interesującą nas wartość
                console.log(`result=${result}`);
                resolve(result); // aby zwrócić poprawnie wynik zamiast return stosujemy funkcję "resolve"
            }
        });
    });
}

exports.path = "/waluta";
exports.execute = async function (req, res) {
    
    let waluta = req.query.waluta;
    let kwota = parseFloat(req.query.kwota);
    
    if (!req.query.waluta)
        return res.send({ ok: false, message: "Podaj argument waluta - trzyliterowy kod waluty ISO np. PLN, CHF" });
    if (!req.query.kwota)
        return res.send({ ok: false, message: "Podaj argument kwota, wartość waluty, którą mamy przeliczyć" });
    
    let kurs_waluty = await fetch (waluta, kwota) //tutaj stosujemy "await" - który pozwala nam zaczekać aż się skończy działanie funkcji fetch

    res.send({
            ok: true,
            waluta: waluta,
            kwota_oryg: kwota,
            kurs_waluty: kurs_waluty,
            wynik: kurs_waluty * kwota
    });
};
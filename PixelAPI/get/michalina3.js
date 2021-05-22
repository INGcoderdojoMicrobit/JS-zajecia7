/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Woła api zwracjące listę świąt państwowych

*/

const {port, klucz} = require('../config.json');
const request = require('request');



function fetch(iYear) {
    return new Promise(function (resolve, reject) {
        let result;
        //wywołujemy API
        //https://date.nager.at/api/v3/PublicHolidays/2021/PL
        
        request(`https://date.nager.at/api/v3/PublicHolidays/${encodeURI(iYear)}/PL`, (err, res, body) => {
            
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
                
                let oSwieta = JSON.parse(body); // zaminiamy go na obiekt (parsujemy JSON)

                oSwieta.forEach(element => {
                    console.log(`swieta-> data:${element.date} localna nazwa:${element.localName}, angielska nazwa:${element.name}`);    
                });

                result = "nie ma nic"; // pobieramy odpowiednią interesującą nas wartość
                console.log(`result=${result}`);
                resolve(result); // aby zwrócić poprawnie wynik zamiast return stosujemy funkcję "resolve"
            }
        });
    });
}



exports.path = "/swieta";

exports.execute = async function (req, res) {
      
    
    let iRok = parseInt(req.query.rok);
    if (!req.query.rok)
        return res.send({ ok: false, message: "Podaj argument rok - w którym szukasz świąt państwowych" });
    
    let temp;
    try 
    {
        temp = await fetch (iRok) //tutaj stosujemy "await" - który pozwala nam zaczekać aż się skończy działanie funkcji fetch
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
            rok: iRok,
            wynik: temp
    });
};
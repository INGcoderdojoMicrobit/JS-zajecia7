/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

API wymaga podania daty RRRRMMDD, jeśli nie jest podana bierze datę systemową
API wywołuje inne API REST - które zwraca listę świąt w PL
a potem sprawdza czy podana data (lub data systemowa) odpowiada któremuś ze świąt - jeśli tak - zwraca jego nazwę

*/

const {port, klucz} = require('../config.json');
const request = require('request');

function fetch(iYear, iMonth, iDay) {
    return new Promise(function (resolve, reject) {
        let result;
        //wywołujemy API
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
                    let bZnalazlem = false;
                    let sNazwa = ""
    
                    oSwieta.forEach(element => {
                        console.log(`swieta-> data:${element.date} lokalna nazwa:${element.localName}, angielska nazwa:${element.name}`);    
                        //"date":"2021-01-01"
                        console.log(`swieta-> rok: ${parseInt(element.date.substring(0,4))}, mies: ${parseInt(element.date.substring(5,7))}, dzien: ${parseInt(element.date.substring(8,10))}`)
                        if (iYear==parseInt(element.date.substring(0,4)) && iMonth == parseInt(element.date.substring(5,7)) && iDay == parseInt(element.date.substring(8,10)))
                        {
                            bZnalazlem = true;
                            sNazwa = element.localName + '->' + element.name;
                        }
                    });
    
                                
                    if (bZnalazlem)
                        result = sNazwa; // pobieramy odpowiednią interesującą nas wartość
                    else 
                        result = "nie ma dzisiaj święta"; // nie ma święta
                    console.log(`result=${result}`);
                    resolve(result); // aby zwrócić poprawnie wynik zamiast return stosujemy funkcję "resolve"
            }
        });
    });
}



exports.path = "/ifdata";

exports.execute = async function (req, res) {
      
    
    let sData = req.query.data;
    let iRok, iMiesiac, iDzien, oData

    if (!req.query.data)
    {
        oData = new Date();
        iRok = oData.getFullYear()
        iMiesiac = oData.getMonth() + 1
        iDzien = oData.getDate()
    }
    else
    {
        iRok = parseInt(sData.substring(0,4))
        iMiesiac = parseInt(sData.substring(4,6))
        iDzien = parseInt(sData.substring(6,8))

        if(iRok<1900 || iRok>2100 || iMiesiac<1 || iMiesiac>12 || iDzien<1 || iDzien>31)
            return res.send({ ok: false, message: "Błędny format daty" });
    }

    console.log(`iRok=${iRok}`);
    console.log(`iMiesiac=${iMiesiac}`);
    console.log(`iDzien=${iDzien}`);
        
    let temp;
    try 
    {
        temp = await fetch (iRok, iMiesiac, iDzien) //tutaj stosujemy "await" - który pozwala nam zaczekać aż się skończy działanie funkcji fetch
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
            dzien: iDzien,
            miesiac: iMiesiac,
            czy_swieto: temp
    });
};
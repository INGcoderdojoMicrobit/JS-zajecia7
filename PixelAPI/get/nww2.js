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


function fetch(x, y) {
    return new Promise(function (resolve, reject) {
        let result;
        //wywołujemy API
        request(`http://localhost:${port}/euklides?key=${encodeURI(klucz)}&x=${x}&y=${y}&rekur=false`, (err, res, body) => {
            if (err) 
            {
                reject(err); //jeśli jest błąd - musimy wywołać funkcję "reject"
            }
            else 
            {
                console.log(`body=${body}`);
                body = JSON.parse(body); //w body zawarty jest string zwrócony przez wywoływane API 
                console.log(`bodyJSON=${body}`); // zaminiamy go na obiekt (parsujemy JSON)
                result = body.najw_wsp_dzielnik; // pobieramy odpowiednią interesującą nas wartość
                console.log(`result=${result}`);
                resolve(result); // aby zwrócić poprawnie wynik zamiast return stosujemy funkcję "resolve"
            }
        });
    });
}


let NWD2 = (x,y) => {
    console.log(`x=${x} y=${y} =>`)
    while(y!=x){
        if(x>y){
            x=x-y
            if(x==y) {console.log(`x==y wynik=${x}`); return x}
        }
        else if(x<y){
            y=y-x
            if(y==x) {console.log(`y==x wynik=${y}`); return y}
        }
        else {console.log(`else wynik=${x}`); return x}
    }
    
}

exports.path = "/nww2";

exports.execute = async function (req, res) {
      
    
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);
    let z;
    if (!req.query.x)
        return res.send({ ok: false, message: "Podaj argument x" });
    if (!req.query.y)
        return res.send({ ok: false, message: "Podaj argument y" });
    //if (!req.query.rekur)
        //return res.send({ ok: false, message: "Podaj argument rekur" });

    z = x * y;
    let zmienna = await fetch (x, y) //tutaj stosujemy "await" - który pozwala nam zaczekać aż się skończy działanie funkcji fetch

    res.send({
            ok: true,
            najw_wsp_dzielnik: NWD2(x,y),
            najmn_wsp_wielokrotnosc: z/NWD2(x,y),
            najmn_wsp_wielokrotnosc_z_API: z / zmienna,
    });
};
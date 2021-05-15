/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca najmniejsza wspólna wielokrotność liczb x i y 

*/

const {port, klucz} = require('../config.json');
const request = require('request');
const fetchLib = require('node-fetch');

//http://localhost:3000/euklides?key=%3EKAJro848VMjRsa8Hpj7&x=393&y=123456&rekur=false
//{"ok":true,"najw_wsp_dzielnik":3,"x":393,"y":123456}

function fetch(x, y) {
    return new Promise(function (resolve, reject) {
        let result;
        request(`http://localhost:${port}/euklides?key=${encodeURI(klucz)}&x=${x}&y=${y}&rekur=false`, (err, res, body) => {
            if (err) 
            {
                reject(err);
            }
            else 
            {
                console.log(`body=${body}`);
                body = JSON.parse(body); //body to wynik
                console.log(`bodyJSON=${body}`);
                result = body.najw_wsp_dzielnik;
                console.log(`result=${result}`);
                resolve(result);
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
    //if (req.query.rekur =="true")
    //    res.send({
    //            ok: true,
    //            najw_wsp_dzielnik: NWD(x,y),
    //            x: x,
    //            y: y
    //    });
    //else    
let zmienna = await fetch (x, y)
        res.send({
        ok: true,
        najw_wsp_dzielnik: NWD2(x,y),
        najmn_wsp_wielokrotnosc: z/NWD2(x,y),
        najmn_wsp_wielokrotnosc_z_API: z / zmienna,
});
};
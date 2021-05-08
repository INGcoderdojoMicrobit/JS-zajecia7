/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca najmniejsza wspólna wielokrotność liczb x i y 

Przykładowy wynik
 {"ok":true,"time":"13:17:43","hours":13,"minutes":17,"seconds":43,"miliseconds":372}
*/
//ecmascript
/*let NWD = (x,y) => {
    let wyn=0;
    console.log(`x=${x} y=${y} =>`)
    if(x>y){
        x=x-y
        if(x==y) {console.log(`x==y wynik=${x}`); return x}
        else {wyn = NWD(x,y); console.log(`NWD() wynik=${wyn}`); return wyn;}
    }
    else if(x<y){
        y=y-x
        if(y==x) {console.log(`y==x wynik=${y}`); return y}
        else {wyn = NWD(x,y); console.log(`NWD() wynik=${wyn}`); return wyn;}
    }
    else {console.log(`else wynik=${x}`); return x}
}*/

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



exports.path = "/nww";

exports.execute = (req, res) => {
      
    
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);
    let z;
    if (!req.query.x)
        return res.send({ ok: false, message: "Podaj argument x" });
    if (!req.query.y)
        return res.send({ ok: false, message: "Podaj argument y" });
    //if (!req.query.rekur)
        //return res.send({ ok: false, message: "Podaj argument rekur" });
    z=x*y;
    //if (req.query.rekur =="true")
    //    res.send({
    //            ok: true,
    //            najw_wsp_dzielnik: NWD(x,y),
    //            x: x,
    //            y: y
    //    });
    //else    
        res.send({
        ok: true,
        najw_wsp_dzielnik: NWD2(x,y),
        najmn_wsp_wielokrotnosc: z/NWD2(x,y),
        x: x,
        y: y
});
};
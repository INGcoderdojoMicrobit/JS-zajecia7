/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca największy wspólny dzielnik liczb x i y 

Przykładowy wynik
 {"ok":true,"time":"13:17:43","hours":13,"minutes":17,"seconds":43,"miliseconds":372}
*/
//ecmascript
function IP(x){
    if(x==1) return false
    for(let i=2; i<x; i++){
        if(x%i==0) return false
    }
    return true
}


exports.path = "/isprime";

exports.execute = (req, res) => {
      
    
    let x = parseInt(req.query.x);
    if (!req.query.x)
        return res.send({ ok: false, message: "Podaj argument x" });

    res.send({
            ok: true,
            isprime: IP(x),
            x: x
    });
};
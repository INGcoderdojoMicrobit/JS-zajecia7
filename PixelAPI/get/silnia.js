/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca silnie z liczby 

*/

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
    
let silnia2 = (n) => {
    wyn = 1
    for (let i=1; i<=n; i++)
    {
        wyn = wyn * i 
    }
    return wyn
}




let silnia = (n) => {
    let i=1
    let wyn=1
    while(i<=n){
        wyn = wyn * i
        i++
    }
    return wyn
}


exports.path = "/silnia";

exports.execute = (req, res) => {
      
    
    if (!req.query.n)
        return res.send({ ok: false, message: "Podaj argument n" });
    let n = parseInt(req.query.n);
    
    res.send({
        ok: true,
        silniaN: silnia(n),
        silniaN2: silnia2(n),
        n: n
    });
};
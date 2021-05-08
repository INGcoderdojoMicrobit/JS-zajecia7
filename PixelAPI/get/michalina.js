/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

To żądanie losuje numer

Parametry
 min (wymagane) - minimalna liczba
 max (wymagane) - maksymalna liczba

Przykładowy wynik
 {"ok":true,"result":37524}
*/

exports.path = "/michalina";

exports.execute = (req, res) => {
    
    if (!req.query.x)
        return res.send({ ok: false, message: "Podaj argument x" });
    if (!req.query.y)
        return res.send({ ok: false, message: "Podaj argument y" });
    //    if ( y > 0 )
    //    wynik = wynik * x 

    
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);
    let wynik = 1;
    while ( y > 0 )
    { 
        wynik = wynik * x 
        y--
    }
    res.send({
        ok: true,
        result: wynik
    });
    
};

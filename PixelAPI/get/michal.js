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

exports.path = "/michal";

exports.execute = (req, res) => {
    if (!req.query.x)
        return res.send({ ok: false, message: "Podaj argument x"});
    if (!req.query.y)
        return res.send({ ok: false, message: "Podaj argument y" })
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);
    let wynik = 1;
    
    for (let i = 1; i <= y; i++)
    {
        wynik = wynik * x
    }

    res.send({
        ok: true,
        result: wynik 
    });
};

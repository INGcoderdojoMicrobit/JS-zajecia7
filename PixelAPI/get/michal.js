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
    if (!req.query.min)
        return res.send({ ok: false, message: "Podaj argument min" });
    if (!req.query.max)
        return res.send({ ok: false, message: "Podaj argument max" });
    if (!req.query.x)
        return res.send({ ok: false, message: "Podaj argument x"});
    if (!req.query.y)
        return res.send({ ok: false, message: "Podaj argument y" })

    let min = parseInt(req.query.min);
    let max = parseInt(req.query.max);
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);

    res.send({
        ok: true,
        result: (Math.floor(Math.random() * (max - min + 1)) + min) * x + y 
    });
};

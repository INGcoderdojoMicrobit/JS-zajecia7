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

exports.path = "/kornel";

exports.execute = (req, res) => {
    if (!req.query.x)
        return res.send({ ok: false, message: "Podaj liczbę x" });
    //if (!req.query.max)
    //    return res.send({ ok: false, message: "Podaj amogus" });

    let x = parseInt(req.query.x);
    if (x == NaN) return res.send({ok: false, message: 'Podaj poprawną liczbę w parametrze x'});
    //let max = parseInt(req.query.max);
    if (x % 2 == 0)
    {
        res.send({
            ok: true,
            result: "parzysta"
        });
    }
    else{
        res.send({
            ok: true,
            result: "nieparzysta"
        });
    }
};
// Big Chungus
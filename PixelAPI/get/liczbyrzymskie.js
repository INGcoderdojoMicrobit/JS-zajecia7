/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca liczbę rzymską

Argumenty
 number - int, wymagany, minimum 1, maksimum 3000

Przykładowy wynik
 {"ok":true,"result":"CCCXXVI"}
*/

exports.path = "/number/romanize";

exports.execute = (req, res) => {
    if (!req.query.number) return res.send({ok: false, message: 'Podaj numer w parametrze number'});
    if (isNaN(parseInt(req.query.number))) return res.send({ok: false, message: 'Nieprawidłowy numer'});
    //if (parseInt(req.query.number) > 3000) return res.send({ok: false, message: 'Obsługuję tylko numery do 3000!'});
    if (parseInt(req.query.number) < 1) return res.send({ok: false, message: 'Obsługuję tylko numery większe miż 0!'});

    let num = parseInt(req.query.number),
        digits = String(+num).split(""),
        result,
        key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
               '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
               '','I','II','III','IV','V','VI','VII','VIII','IX'],
        roman = '',
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    result = Array(+digits.join('') + 1).join('M') + roman;

    res.send({ok: true, result: result});
};
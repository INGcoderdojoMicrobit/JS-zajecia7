/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Wysyła duży tekst

Parametry
 text (wymagany) - tekst który ma być dużym tekstem

Przykładowy wynik
 {"ok":true,"result":"  _            _   \n | |_ ___  ___| |_ \n | __/ _ \\/ __| __|\n | ||  __/\\__ \\ |_ \n  \\__\\___||___/\\__|\n                   "}
*/

const figlet = require('figlet');
exports.path = "/figlet";

exports.execute = (req, res) => {
    figlet(req.query.text, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ok: false, message: 'Internal server error'});
            return;
        }
        res.send({ok: true, result: data});
    });
}
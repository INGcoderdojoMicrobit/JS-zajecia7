/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

To żądanie wyszukuje w wikipedii

Parametry
 q (wymagane) - czego szukasz w wikipedii
 limit (opcjonalnie, domyślnie 10) - limit wyników

Przykładowy wynik
 {"ok":true,"results":[{"title":"Królikarnia","url":"https://en.wikipedia.org/wiki/Kr%C3%B3likarnia"}]}
*/
const request = require('request');

exports.path = "/wikipedia/search";

exports.execute = (req, resp) => {
    if (!req.query.q) return resp.send({ok: false, message: 'Podaj parametr q'});
    request(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURI(req.query.q)}&limit=${req.query.limit || 10}`, (err, res, body) => {
        if (err) throw err;
        let json = JSON.parse(body);
        let output = [];
        output[0] = json[1];
        output[1] = json[3];
        let results = [];
        for (let i = 0; i < output[0].length; i++) {
            results.push({title: output[0][i], url: output[1][i]})
        }
        resp.send({ok: true, results: results});
    })
};
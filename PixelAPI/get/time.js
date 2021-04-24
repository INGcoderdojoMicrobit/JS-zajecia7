/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

To żądanie zwraca czas w podanej strefie czasowej

Parametry
 gmt (opcjonalnie, domyślnie 0) - Strefa czasowa w formacie GMT

Przykładowy wynik
 {"ok":true,"time":"13:17:43","hours":13,"minutes":17,"seconds":43,"miliseconds":372}
*/

exports.path = "/time";

exports.execute = (req, res) => {
    let gmt = parseInt(req.query.gmt) || 0;
    let data = new Date();
    res.send({
        ok: true,
        time: `${data.getUTCHours() + gmt}:${data.getUTCMinutes() + gmt}:${
            data.getUTCSeconds() + gmt
        }`,
        hours: data.getUTCHours() + gmt,
        minutes: data.getUTCMinutes() + gmt,
        seconds: data.getUTCSeconds() + gmt,
        miliseconds: data.getUTCMilliseconds() + gmt,
    });
};
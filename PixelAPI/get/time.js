/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca serwerowy czas

Przykładowy wynik
 {"ok":true,"time":"13:17:43","hours":13,"minutes":17,"seconds":43,"miliseconds":372}
*/

exports.path = "/time";

exports.execute = (req, res) => {
    let data = new Date();
    res.send({
        ok: true,
        time: `${data.getHours()}:${data.getMinutes()}:${
            data.getSeconds()
        }`,
        hours: data.getHours(),
        minutes: data.getMinutes(),
        seconds: data.getSeconds(),
        miliseconds: data.getMilliseconds(),
    });
};
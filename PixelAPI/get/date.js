/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

To żądanie zwraca datę w strefie czasowej GMT+0 (UTC)

Przykładowy wynik
 {"ok":true,"dayOfWeek":6,"day":24,"month":4,"year":2021}
*/

exports.path = "/date";

exports.execute = (req, res) => {
    let data = new Date();
    res.send({
        ok: true,
        dayOfWeek: data.getUTCDay(),
        day: data.getUTCDate(),
        month: data.getUTCMonth() + 1, //miesiące są liczone od 0 do 11, więc musimy dodać 1
        year: data.getUTCFullYear(),
    });
};
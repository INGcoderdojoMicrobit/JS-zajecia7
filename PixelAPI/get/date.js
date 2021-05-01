/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

Zwraca serwerową datę

Przykładowy wynik
 {"ok":true,"dayOfWeek":6,"day":24,"month":4,"year":2021}
*/

exports.path = "/date";

exports.execute = (req, res) => {
    let data = new Date();
    res.send({
        ok: true,
        dayOfWeek: data.getDay(),
        day: data.getDate(),
        month: data.getMonth() + 1, //miesiące są liczone od 0 do 11, więc musimy dodać 1
        year: data.getFullYear(),
    });
};
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
//ecmascript
const dnitygodnia = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
let Domek = (DOW) => {
    DOW = DOW.toString();
    /*if (DOW == '0') {

    } else if (DOW = '1') {

    } else*/
    switch (DOW) {
        case '0':
            return 'Niedziela';
        case '1':
            return 'Poniedziałek';
        case '2':
            return 'Wtorek';
        case '3':
            return 'Środa';
        case '4':
            return 'Czwartek';
        case '5':
            return 'Piątek';
        case '6':
            return 'Sobota';
        default:
            return false;
    }
}

exports.path = "/maksg";

exports.execute = (req, res) => {
    //                            0            1             2        3         4            5       6
        
    
    let data = new Date();
    let DOW = parseInt(req.query.DOW);
    if (!req.query.DOW)
    {
        res.send({
            ok: true,
            time: `${data.getDay()}:${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`,
            DayOfWeek: data.getDay(),
            hours: data.getHours(),
            minutes: data.getMinutes(),
            seconds: data.getSeconds(),
            miliseconds: data.getMilliseconds(),
            DzienTygodnia: dnitygodnia[data.getDay()]
        });
    } else
    {
        res.send({
            ok: true,
            time: `${data.getDay()}:${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`,
            DayOfWeek: data.getDay(),
            hours: data.getHours(),
            minutes: data.getMinutes(),
            seconds: data.getSeconds(),
            miliseconds: data.getMilliseconds(),
            DzienTygodnia: dnitygodnia[DOW],
            testowa_wartosc_DOW: DOW
        });
    }
};
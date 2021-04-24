const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
const NASA_API_KEY = 'DEMO_KEY'
let earth_link = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`

const klucz = 'wfteuy92gf92bf32f3yo7gb2gb67q2ov7q2ntcf4fg27q3cnvfewuyf4cg68obf2nyvby72ncv7tq23fcnv76yraefruyal32uyg';

//funkcja zwraca losową wartość między (min,max)
let getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//funkcja zwraca string z datą i godziną lokalną
function reportdate()
{
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = ("0" + (date_ob.getHours() + 1)).slice(-2);

  // current minutes
  let minutes = ("0" + (date_ob.getMinutes() + 1)).slice(-2);

  // current seconds
  let seconds = ("0" + (date_ob.getSeconds() + 1)).slice(-2);

  return `${year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}`; 

}

//req - request
//res - response
app.get('/', (req, res) => {
    console.log(`/, o godzinie ${reportdate()}`)
    res.send({ ok: true });
});

//req.query - wartości po ?
app.get('/echo', (req, res) => {
    if (!req.query.key) return res.status(403).send({ok: false, message: 'Podaj klucz API w parametrze key'});
    if (req.query.key != klucz) return res.status(403).send({ok: false, message: 'Nieprawidłowy klucz'});
    console.log(JSON.stringify(req.query));
    /*if (!req.query.msg) res.send({ ok: false, message: 'Podaj parametr msg' });
    else {
        //console.log(`echo -> ${req.query.msg}`);
        res.send(req.query.msg);
    }*/
    console.log(`/echo, o godzinie ${reportdate()}`)
    res.send(JSON.stringify(req.query));
});

app.get('/time', (req, res) => {
    if (!req.query.key) return res.status(403).send({ok: false, message: 'Podaj klucz API w parametrze key'});
    if (req.query.key != klucz) return res.status(403).send({ok: false, message: 'Nieprawidłowy klucz'});
    let gmt = parseInt(req.query.gmt) || 0;
    console.log(`/time, o godzinie ${reportdate()}`)
    let data = new Date();
    res.send({
        ok: true, 
        time: `${data.getUTCHours() + gmt}:${data.getUTCMinutes() + gmt}:${data.getUTCSeconds() + gmt}`, 
        hours: data.getUTCHours() + gmt, 
        minutes: data.getUTCMinutes() + gmt, 
        seconds: data.getUTCSeconds() + gmt,
        miliseconds: data.getUTCMilliseconds() + gmt
    });
});

app.get('/date', (req, res) => {
    if (!req.query.key) return res.status(403).send({ok: false, message: 'Podaj klucz API w parametrze key'});
    if (req.query.key != klucz) return res.status(403).send({ok: false, message: 'Nieprawidłowy klucz'});
    //let gmt = parseInt(req.query.gmt) || 0;
    console.log(`/date, o godzinie ${reportdate()}`)
    let data = new Date();
    res.send({
        ok: true,
        dayOfWeek: data.getUTCDay(),
        day: data.getUTCDate(),
        month: data.getUTCMonth() + 1,
        year: data.getUTCFullYear()
    });
});

app.get('/randomnumber', (req, res) => {
    if (!req.query.key) return res.status(403).send({ok: false, message: 'Podaj klucz API w parametrze key'});
    if (req.query.key != klucz) return res.status(403).send({ok: false, message: 'Nieprawidłowy klucz'});
    if (!req.query.min) return res.send({ok: false, message: 'Podaj argument min'});
    if (!req.query.max) return res.send({ok: false, message: 'Podaj argument max'});
    
    console.log(`/randomnumber, o godzinie ${reportdate()}`)
    res.send({ok: true, result: getRandomNumber(req.query.min, req.query.max)});
});

app.listen(port, () => {
    console.log(`Słucham na procie ${port}\nKlucz API: ${klucz}, o godzinie ${reportdate()}, `)
});

//gdy mamy błąd  w kodzie
app.use((err, req, res) => {
    if (err) {
        console.error(err);
        res.send({ok: false, message: 'Internal server error'})
    }
})
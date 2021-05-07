const express = require("express");
const app = express();
const { port, klucz } = require("./config.json");
const fetch = require("node-fetch");
const rateLimit = require("express-rate-limit");
const fs = require('fs');

//ograniczamy liczbę żądań z jednego IP do 15 na minutę
const limiter = rateLimit({
    windowMs: 60*1000,
    max: 55,
    message: {ok: false, message: 'You are being rate limited'},
    headers: true
});
app.use(limiter);


//funkcja zwraca string z datą i godziną lokalną
function reportdate()
{
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth())).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = ("0" + (date_ob.getHours())).slice(-2);

  // current minutes
  let minutes = ("0" + (date_ob.getMinutes())).slice(-2);

  // current seconds
  let seconds = ("0" + (date_ob.getSeconds())).slice(-2);

  return `${year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}`; 

}

/*ładujemy wszystkie zapytania GET
Skrypt z ładowania to przerobiony skrypt z Maks1116/PixelBot (prywatne repozytorium)
Copyright (c) 2020 Aternos GmbH
Copyright (c) 2020-2021 Maks1116
*/
(async () => {
    const files = await fs.readdirSync(`./get`)
    for (let file of files) {
        let path = `./get/${file}`;
        if (!file.endsWith('.js') || !(fs.lstatSync(path)).isFile()) {
            continue;
        }
        try {
            app.get(require(path).path, (req, res) => {
                //sprawdzamy, czy mamy klucz API
                if (!req.query.key) return res.status(403).send({ ok: false, message: "Podaj klucz API w parametrze key" });
                if (req.query.key != klucz) return res.status(403).send({ ok: false, message: "Nieprawidłowy klucz" });
                console.log(`/${path} -> ${reportdate()}`)
                //uruchamiamy skrypt
                require(path).execute(req, res);
            });
        } catch (e) {
            console.error(`Nie mogłem załadować GET '${file}'`, e);
        }
    }
})();

/*ładujemy wszystkie zapytania POST
Skrypt z ładowania to przerobiony skrypt z Maks1116/PixelBot (prywatne repozytorium)
Copyright (c) 2020 Aternos GmbH
Copyright (c) 2020-2021 Maks1116
*/
(async () => {
    for (let file of fs.readdirSync(`./post`)) {
        let path = `./post/${file}`;
        if (!file.endsWith('.js') || !(fs.lstatSync(path)).isFile()) {
            continue;
        }
        try {
            app.post(require(path).path, (req, res) => {
                //sprawdzamy, czy mamy klucz API
                if (!req.query.key) return res.status(403).send({ ok: false, message: "Podaj klucz API w parametrze key" });
                if (req.query.key != klucz) return res.status(403).send({ ok: false, message: "Nieprawidłowy klucz" });
                console.log(`/${path} -> ${reportdate()}`)
                //uruchamiamy skrypt
                require(path).execute(req, res)
                //jeśli wyrzuciliśmy błąd dopiero podczas zapytania
                .cath(ex => {
                    console.error(`Błąd w ${path}\n${ex}`);
                })
            });
        } catch (e) {
            console.error(`Nie mogłem załadować POST '${file}'`, e);
        }
    }
})();

app.listen(port, () => {
    console.log(
`🚀 Słucham na porcie: ${port}
Klucz API: ${klucz}`
    );
});
const express = require("express");
const app = express();
const { port, klucz } = require("./config.json");
const fetch = require("node-fetch");
const rateLimit = require("express-rate-limit");
const fs = require('fs');

//ograniczamy liczbę żądań z jednego IP do 15 na minutę
const limiter = rateLimit({
    windowMs: 60*1000,
    max: 15,
    message: {ok: false, message: 'You are being rate limited'},
    headers: true
});
app.use(limiter);

//ładujemy wszystkie zapytania GET
(async () => {
    for (let file of fs.readdirSync(`./get`)) {
        let path = `./get/${file}`;
        if (!file.endsWith('.js') || !(fs.lstatSync(path)).isFile()) {
            continue;
        }
        try {
            app.get(require(path).path, (req, res) => {
                //sprawdzamy, czy mamy klucz API
                if (!req.query.key) return res.status(403).send({ ok: false, message: "Podaj klucz API w parametrze key" });
                if (req.query.key != klucz) return res.status(403).send({ ok: false, message: "Nieprawidłowy klucz" });
                //uruchamiamy skrypt
                require(path).execute(req, res);
            });
        } catch (e) {
            console.error(`Nie mogłem załadować GET '${file}'`, e);
        }
    }
})();

//ładujemy wszystkie zapytania POST
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
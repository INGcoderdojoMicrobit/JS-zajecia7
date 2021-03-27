//Kornel
var wyrazy = require("./wyrazy-4-en.json");

var tab = []; //W tej tablicy zapisujemy wszystkie wyniki
let iPozycja = 0;

//inicjowanie tablicy wyników
for (let iIter1 = 0; iIter1 < 40; iIter1++) {
  tab[iIter1] = 0;
};

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
    tab[wyrazy[iIter1].wyraz.length]++;
}
  

//wyświeltamy - parametry funkcji:
// tabelka -> tablica z wynikami
// false -> opis pod histogramem z CYFEREK, true -> opis z LITEREK
// włączamy funkcję ryzującą harmonogram
var api2 = require('./histogram');

console.log(`rozkład długości wyrazów - względem 40000`);
api2.RysujHistogram(tab, false, 0, 40000)
console.log(`rozkład długości wyrazów - rozkład względem największej liczby`);
api2.RysujHistogram(tab, false, 1)
console.log(`rozkład długości wyrazów - rozkład względem sumy wszystkich do 100%`);
api2.RysujHistogram(tab, false, 2, 20)
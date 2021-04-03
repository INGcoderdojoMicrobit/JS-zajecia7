//Kornel
var wyrazy = require("./cov-cases-1.json");

var tab = []; //W tej tablicy zapisujemy wszystkie wyniki
let iPozycja = 0;

//inicjowanie tablicy wyników
for (let iIter1 = 0; iIter1 < 13; iIter1++) {
  tab[iIter1] = 0;
};

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
  if (wyrazy[iIter1].countriesAndTerritories=="Poland") //zliczamy tylko dla Polski
  {
    //tab[ parseInt(wyrazy[iIter1].month)]+=wyrazy[iIter1].cases;
    tab[ parseInt(wyrazy[iIter1].month)]+=wyrazy[iIter1].deaths;
  }
}
  

//wyświeltamy - parametry funkcji:
// tabelka -> tablica z wynikami
// false -> opis pod histogramem z CYFEREK, true -> opis z LITEREK
// włączamy funkcję ryzującą harmonogram
var api2 = require('./histogram');

console.log(`rozkład długości wyrazów - względem 10000`);
api2.RysujHistogram(tab, false, 0, 10000)
console.log(`rozkład długości wyrazów - rozkład względem największej liczby`);
api2.RysujHistogram(tab, false, 1)
console.log(`rozkład długości wyrazów - rozkład względem sumy wszystkich do 100%`);
api2.RysujHistogram(tab, false, 2, 20)



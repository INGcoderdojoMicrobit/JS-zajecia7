//Michalina

var wyrazy = require("./wyrazy-2.json");
//var wyrazy = require("./wyrazy-4-en.json");

var tabelka = []; //W tej tablicy zapisujemy wszystkie wyniki
let iPozycja = 0;

function dlugoscwyrazu(wejWyraz) {
  //sprawdzanie - zwracam długość wyrazu
  //console.log(`wyraz: ${wejWyraz}`);
  return wejWyraz.length;
}

//inicjowanie tablicy wyników -> na razie zakłądamy, że nie będzie wyrazów dłuższych niż 40 literek
for (let iIter1 = 0; iIter1 < 40; iIter1++) {
  tabelka[iIter1] = 0;
};

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
    iPozycja = dlugoscwyrazu(wyrazy[iIter1].wyraz);
  if (iPozycja<100) {
    tabelka[iPozycja]++;
  }
}

console.log(`wyrazow jest ${wyrazy.length}`);
console.log(tabelka);

//wyświeltamy - parametry funkcji:
// tabelka -> tablica z wynikami
// false -> opis pod histogramem z CYFEREK, true -> opis z LITEREK
// włączamy funkcję ryzującą harmonogram
var api2 = require('./histogram');

console.log(`rozkład względem 450000`);
api2.RysujHistogram(tabelka, false, 0, 450000)
console.log(``);
console.log(`rozkład względem największej liczby`);
api2.RysujHistogram(tabelka, false, 1)
console.log(``);
console.log(`rozkład względem sumy wszystkich do 100%`);
api2.RysujHistogram(tabelka, false, 2, 20)
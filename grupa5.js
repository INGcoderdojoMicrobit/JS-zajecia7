//Rafal
// a=0
// b=1
// tab[2] oznacza ilośc wyrazów na literkę "c"

var wyrazy = require("./wyrazy-2.json");


// funkcja zwracaj pozycję 0-25 pierwszej literki wyrazu (a-z), lub 200 jak to nie jest literka
function literaNaMiejsce2(wyraz) {
  if (wyraz.charCodeAt(0) >= 97 & wyraz.charCodeAt(0) <= 122) return wyraz.charCodeAt(0) - 97;
  if (wyraz.charCodeAt(0) >= 65 & wyraz.charCodeAt(0) <= 90) return wyraz.charCodeAt(0) - 65;
  return 200;
}

// funkcja zwracaj pozycję 0-25 pierwszej literki wyrazu (a-z), lub 200 jak to nie jest literka
function literaNaMiejsce(wyraz) {
  wyraz = wyraz.toLowerCase();
  if (wyraz.charCodeAt(0) < 97 || wyraz.charCodeAt(0) > 122) return 200;

  if (wyraz[0] == "a") return 0;
  else if (wyraz[0] == "b") return 1;
  else if (wyraz[0] == "c") return 2;
  else if (wyraz[0] == "d") return 3;
  else if (wyraz[0] == "e") return 4;
  else if (wyraz[0] == "f") return 5;
  else if (wyraz[0] == "g") return 6;
  else if (wyraz[0] == "h") return 7;
  else if (wyraz[0] == "i") return 8;
  else if (wyraz[0] == "j") return 9;
  else if (wyraz[0] == "k") return 10;
  else if (wyraz[0] == "l") return 11;
  else if (wyraz[0] == "m") return 12;
  else if (wyraz[0] == "n") return 13;
  else if (wyraz[0] == "o") return 14;
  else if (wyraz[0] == "p") return 15;
  else if (wyraz[0] == "q") return 16;
  else if (wyraz[0] == "r") return 17;
  else if (wyraz[0] == "s") return 18;
  else if (wyraz[0] == "t") return 19;
  else if (wyraz[0] == "u") return 20;
  else if (wyraz[0] == "v") return 21;
  else if (wyraz[0] == "w") return 22;
  else if (wyraz[0] == "x") return 23;
  else if (wyraz[0] == "y") return 24;
  else if (wyraz[0] == "z") return 25;
  else return 200;
}


var tab = []; //W tej tablicy zapisujemy wszystkie wyniki
let iPozycja = 0;

//inicjowanie tablicy wyników
for (let iIter1 = 0; iIter1 < 26; iIter1++) {
  tab[iIter1] = 0;
};
//console.log(tab);

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
    iPozycja = literaNaMiejsce2(wyrazy[iIter1].wyraz);
    //console.log(iPozycja);
  if (iPozycja<200) {
    tab[iPozycja]++;
  }
}

//console.log(tab);

//wyświeltamy - parametry funkcji:
// tabelka -> tablica z wynikami
// false -> opis pod histogramem z CYFEREK, true -> opis z LITEREK
// włączamy funkcję ryzującą harmonogram
var api2 = require('./histogram');

console.log(`rozkład ilości wyrazów po pierwszej literze - względem 750000`);
api2.RysujHistogram(tab, true, 0, 750000)
console.log(``);
console.log(`rozkład ilości wyrazów po pierwszej literze - względem największej liczby`);
api2.RysujHistogram(tab, true, 1)
console.log(``);
console.log(`rozkład ilości wyrazów po pierwszej literze - względem sumy wszystkich do 100%`);
api2.RysujHistogram(tab, true, 2, 20)
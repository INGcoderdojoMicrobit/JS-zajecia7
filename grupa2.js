/*
  ____        _                               _              _
 |  _ \  ___ | | ___   _ _ __ ___   ___ _ __ | |_ __ _  ___ (_) __ _
 | | | |/ _ \| |/ / | | | '_ ` _ \ / _ \ '_ \| __/ _` |/ __|| |/ _` |
 | |_| | (_) |   <| |_| | | | | | |  __/ | | | || (_| | (__ | | (_| |
 |____/ \___/|_|\_\\__,_|_| |_| |_|\___|_| |_|\__\__,_|\___|/ |\__,_|
                                                          |__/

count(string, letter) - liczy ilość liter (letter) w tekście (string)

countArray(arr, letter) - liczy ilość liter (letter) w tablicy (arr)

englishAlphabet(str) - zwraca w tablicy liczbę liter z angielskiego alfabetu (array letters (wbudowane)) z podanego tekstu (str)

englishAlphabetArray(arr) - zwraca w tablicy liczbę liter z angielskiego alfabetu (array letters (wbudowane)) z podanej tablicy (arr)

letters - tablica z literami angielskiego alfabetu w kolejności alfabetycznej
*/

//Maks Pixel


//dla stringa .split("o").length-1

//angielski alfabet
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var count = (str, letter) => {
  return str.split(letter).length - 1;
};

var countArray = (arr, letter) => {
  //łatwiej będzie nam to zrobić na stringu
  var str = arr.join();
  return count(str, letter);
};

var englishAlphabet = (str) => {
  var nums = [];
  str = str.toLowerCase();
  letters.forEach(l => {
    //console.log(l);
    nums.push(count(str, l));
  })
  return nums;
};

var englishAlphabetArray = (arr) => {
  var str = arr.join();
  return englishAlphabet(str);
};

var arr = require('./wyrazy-2.json');
var arr2 = [];
arr.forEach (o => {
    arr2.push(o.wyraz);
});
console.log(letters);
let tabelka = [];
tabelka = englishAlphabetArray(arr2);
console.log(tabelka);

//dzięki temu można używać jako api lub bibliotekę
exports.countArray = countArray;
exports.count = count;
exports.englishAlphabet = englishAlphabet;
exports.englishAlphabetArray = englishAlphabetArray;
exports.englishAlphabet = letters;

//wyświeltamy - parametry funkcji:
// tabelka -> tablica z wynikami
// false -> opis pod histogramem z CYFEREK, true -> opis z LITEREK
// włączamy funkcję ryzującą harmonogram
var api2 = require('./histogram');

console.log(`rozkład literek a-z (wszystkich wyrazów) - względem 3400000`);
api2.RysujHistogram(tabelka, true, 0, 3400000)
console.log(``);
console.log(`rozkład literek a-z (wszystkich wyrazów) - rozkład względem największej liczby`);
api2.RysujHistogram(tabelka, true, 1)
console.log(``);
console.log(`rozkład literek a-z (wszystkich wyrazów) - rozkład względem sumy wszystkich do 100%`);
api2.RysujHistogram(tabelka, true, 2, 20)



















/*
var wyrazy = require("./wyrazy-4-en.json");

var tab = []; //W tej tablicy zapisujemy wszystkie wyniki
let iPozycja = 0;

//inicjowanie tablicy wyników
for (let iIter1 = 0; iIter1 < 100; iIter1++) {
  tab[iIter1] = 0;
};

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
    //console.log(`${wyrazy[iIter1].wyraz} ala ma kota: ${FunkcjaMoja(wyrazy[iIter1].wyraz) ? "tak" : "nie"}`);
    iPozycja = FunkcjaMoja(wyrazy[iIter1].wyraz);
  if (iPozycja<100) {
    //console.log(wyrazy[iIter1].wyraz);
    tab[iPozycja]++;
  }
  //if (iIter1%10000==0) console.log(iIter1) //Wyświetl co 10 000 przejścia, na którym słowie jesteśmy
}

console.log(`wyrazow jest ${wyrazy.length}`);
console.log(tab);

function FunkcjaMoja(wejWyraz) {
  //sprawdzanie - robię to co ma robic funkcja
  //console.log(`wyraz: ${wejWyraz}`);
  var iWynik = 200;
  for (let iIter3 = 0; iIter3 < Math.floor(wejWyraz.length / 2); iIter3++) {
    //console.log(`literka: ${iIter3}, ${wejWyraz[iIter3]}, od konca: ${wejWyraz.length-iIter3-1}, ${wejWyraz[wejWyraz.length-iIter3-1]}`);
    if (wejWyraz[iIter3] != wejWyraz[wejWyraz.length - iIter3 - 1]) {
      iWynik = 10;
      //console.log(`niekoniecznie: ${wejWyraz}`);
      break; // nie jestem przerywam
    }
  }
  return iWynik;
}
*/
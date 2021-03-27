//Michalina

var wyrazy = require("./wyrazy-2.json");

var tab = []; //W tej tablicy zapisujemy wszystkie wyniki
let iPozycja = 0;

//inicjowanie tablicy wyników
for (let iIter1 = 0; iIter1 < 20; iIter1++) {
  tab[iIter1] = 0;
};

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
    //console.log(`${wyrazy[iIter1].wyraz} ala ma kota: ${FunkcjaMoja(wyrazy[iIter1].wyraz) ? "tak" : "nie"}`);
    iPozycja = dlugoscwyrazu(wyrazy[iIter1].wyraz);
  if (iPozycja<100) {
    //console.log(wyrazy[iIter1].wyraz);
    tab[iPozycja]++;
  }
  //if (iIter1%10000==0) console.log(iIter1) //Wyświetl co 10 000 przejścia, na którym słowie jesteśmy
}

console.log(`wyrazow jest ${wyrazy.length}`);
console.log(tab);

function dlugoscwyrazu(wejWyraz) {
  //sprawdzanie - zwracam długość wyrazu
  //console.log(`wyraz: ${wejWyraz}`);
  return wejWyraz.length;
}
 
var wyrazy = require("./wyrazy-2.json");

var tab = []; //W tej tablicy zapisujemy wszystkie wyniki

for (
  let iIter1 = 0;
  iIter1 < wyrazy.length - 1;
  iIter1++
) {
    //console.log(`${wyrazy[iIter1].wyraz} ala ma kota: ${FunkcjaMoja(wyrazy[iIter1].wyraz) ? "tak" : "nie"}`);
  if (FunkcjaMoja(wyrazy[iIter1].wyraz)) {
    console.log(wyrazy[iIter1].wyraz);
    tab.push(wyrazy[iIter1].wyraz);
  }
  //if (iIter1%10000==0) console.log(iIter1) //Wyświetl co 10 000 przejścia, na którym słowie jesteśmy
}

console.log(`wyrazow jest ${wyrazy.length}`);
console.log(tab);

function FunkcjaMoja(wejWyraz) {
  //sprawdzanie - robię to co ma robic funkcja
  //console.log(`wyraz: ${wejWyraz}`);
  var bWynik = true;
  for (let iIter3 = 0; iIter3 < Math.floor(wejWyraz.length / 2); iIter3++) {
    //console.log(`literka: ${iIter3}, ${wejWyraz[iIter3]}, od konca: ${wejWyraz.length-iIter3-1}, ${wejWyraz[wejWyraz.length-iIter3-1]}`);
    if (wejWyraz[iIter3] != wejWyraz[wejWyraz.length - iIter3 - 1]) {
      bWynik = false;
      //console.log(`niekoniecznie: ${wejWyraz}`);
      break; // nie jestem przerywam
    }
  }
  return bWynik;
}



//var api = require('./grupa2.js');


var tablica = []; //W tej tablicy zapisujemy wszystkie wyniki

for (let iIter1 = 0; iIter1 < 26; iIter1++) {
    tablica.push(Math.round(Math.random()*1000));
    console.log(tablica[iIter1])
}
  

var api2 = require('./histogram');
api2.RysujHistogram(tablica, true, 0, 1000)
api2.RysujHistogram(tablica, true, 1)
api2.RysujHistogram(tablica, true, 2,10)

//console.log(api.englishAlphabetArray(arr2));
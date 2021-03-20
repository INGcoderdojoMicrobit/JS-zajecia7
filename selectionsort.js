var ludzie = require("./ludzie-4.json");
// tutaj mamy wczytane dane do tablicy ludzie
// w takiej strukturze
//name:"Mieczysław",
//surename:"Nowicki",
//age:94,
//gender:"Male","Female"
//hight:166

var m = 0;
var k = 0;
var niska_kreska;
var najwyzsza_kreska;

// UWAGA! nowe zmienne nazywamy według konwencji:
// pierwsza litera oznacza typ - z tych poniżej:
// ----------------------
// integer - całkowita
// string - tekst
// long - całkowita
// bool - logiczna (true/false)
// float - rzeczywista
// char - pojedynyczy znak
// real - rzeczywista
// object - obiekt
// listy
// tablice
//--------------------
// reszta z dużej litery oznacza nazwę zmiennej - opisową
// np: iIterator - zmienna typu int, iterator w pętli


function SelectionSort() {
  //sortowanie przez wybieranie
  iIlePrzejsc = 0;
  var iKtoraNajnizsza = 0;

  console.log(`rozpoczynam sortowanie przez wybieranie`);
  for (var iIter2 = 0; iIter2 < ludzie.length; iIter2++) {
    //ustawiamy początkowe wartości
    niska_kreska = ludzie[iIter2].hight;
    iKtoraNajnizsza = iIter2;

    //wyszukiwanie najmniejszej wartości
    for (iIter1 = iIter2; iIter1 < ludzie.length; iIter1++) {
      //porównujemy najmniejszą znalezioną do tej pory z aktualną
      if (niska_kreska > ludzie[iIter1].hight) {
        //znaleziona mniejsza - wstawiamy jako najmnijesza
        niska_kreska = ludzie[iIter1].hight;
        //zapamiętujemy pozycję najmniejszej
        iKtoraNajnizsza = iIter1;
      }
      //efektywność algorytmu
      iIlePrzejsc++;
    }
    //zamieniamy miejscami najmniejszą i aktualną
    oCzlowiek = ludzie[iKtoraNajnizsza];
    ludzie[iKtoraNajnizsza] = ludzie[iIter2];
    ludzie[iIter2] = oCzlowiek;

    if (iIlePrzejsc % 1000 == 0) console.log(`SS iter: ${iIlePrzejsc}`);
    //console.log(`przejscie: ${iIter2}`);
  }

  console.log(`przejsc sortowania przez wybieranie: ${iIlePrzejsc}`);

  console.log("PO SORTOWANIU:");

  for (let iIter1 = 0; iIter1 < 100; iIter1++) {
    console.log(
      `nazwisko:${ludzie[iIter1].surename} imie: ${ludzie[iIter1].name}`
    );
  }
}



SelectionSort();

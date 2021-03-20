var ludzie = require("./ludzie-3.json");
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

var tabImiona = [];

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


////////////////////////////////////////////////////////////////////////////////////
//
//
//
//
//
// zabawy z sortowaniem
//
// TODO:
// 1. sortowanie z polskimi znakami
// 2. sortowanie po kilku kryteriach - nazwisko, potem imię
//
//
////////////////////////////////////////////////////////////////////////////////////

function BubbleSort() {
  // wyświetlamy pierwsze 10 osób wg wzrostu
  console.log(`wzrost (pierwsze 10)`);
  for (let iIter1 = 0; iIter1 < 10; iIter1++) {
    console.log(ludzie[iIter1].hight);
  }

  //sortowanie bąbelkowe
  var bBrakZmian = true;
  var iIlePrzejsc = 0;

  console.log(`rozpoczynam sortowanie bąbelkowe`);
  while (bBrakZmian) {
    bBrakZmian = false;

    for (let iIter1 = 0; iIter1 < ludzie.length - 1; iIter1++) {
      //console.log(ludzie[iIter1].hight);

      var oCzlowiek;
      // tutaj jest główne porównanie sortowania - może być według:
      // imion alfabetycznie - if (ludzie[iIter1].name>ludzie[iIter1+1].name){
      // wzrostu - if (ludzie[iIter1].hight>ludzie[iIter1+1].hight){
      // wieku - if (ludzie[iIter1].age>ludzie[iIter1+1].age){
      // albo nazwiska - alfabetycznie
      // uwaga - porównanie stringów nmie działa na polskich znaczkach - źle sortuje
      // bo w znakach ASCII często literki "polskie" są dużo dalej niż literki angielskie
      // a = 97
      // b = 98
      // ą = 177
      // aby sortowało poprawnie - trzba napisać własną funkcję porównującą
      //if (ludzie[iIter1].surename>ludzie[iIter1+1].surename){
      if (
        ludzie[iIter1].surename + ludzie[iIter1].name >
        ludzie[iIter1 + 1].surename + ludzie[iIter1 + 1].name
      ) {
        // zamieniamy miejscami dwa obiekty w tablicy ludzie
        oCzlowiek = ludzie[iIter1];
        ludzie[iIter1] = ludzie[iIter1 + 1];
        ludzie[iIter1 + 1] = oCzlowiek;
        bBrakZmian = true;
      }
      // zliczamy efektywność algorytmu
      iIlePrzejsc++;
    }
    if (iIlePrzejsc % 1000 == 0) console.log(`BS iter: ${iIlePrzejsc}`);
  }
  // wyświetlamy efektywność sortowania
  console.log(`przejsc sortowania bąbelkowego: ${iIlePrzejsc}`);
  for (let iIter1 = 0; iIter1 < 100; iIter1++) {
    console.log(
      `nazwisko:${ludzie[iIter1].surename} imie: ${ludzie[iIter1].name}`
    );
  }
}





BubbleSort();


var fs = require("fs");
var data;
var rl2;
const readline = require('readline');

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
var najkr_imie;
var najdl_imie;
var sNajk_imie;
var sNajd_imie;
var sNajd_nazw;
var iNajdl_nazw;

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

function ZliczajStatystyki() {
  // tutaj zakładamy, że lista nie jest pusta - inaczej nie będzie miała obiektu na pozycji [0]
  niska_kreska = ludzie[0].hight;
  najwyzsza_kreska = ludzie[0].hight;

  najkr_imie = ludzie[0].name.length;
  sNajk_imie = ludzie[0].name;
  sNajd_imie = ludzie[0].name;
  najdl_imie = ludzie[0].name.length;
  sNajd_nazw = ludzie[0].surename;
  iNajdl_nazw = ludzie[0].surename.length;
  //console.log(ludzie);

  //lecimy po całej tablicy i wyszukujemy potrzebne informacje
  ludzie.forEach((element) => {
    if (element.gender == "Male") m++;
    //zliczamy facetów
    else if (element.gender == "Female") k++;
    //zliczamy kobiety
    else console.error("nierozpoznana płec");

    //jeśli znejdziemy niższą osobę niż nasza "tymczasowa"
    if (niska_kreska > element.hight) 
    {
      // to wpisujemy niższą jako "tymczasowo najniższą" - malujemy na tablicy kredą niższą kreskę
      niska_kreska = element.hight;
    }

    //podobnie z najwyższą osobą
    if (najwyzsza_kreska < element.hight) najwyzsza_kreska = element.hight;
    

    //najdłuższe/najkrótsze imie
    //console.log(element.name.length);
    imie_dl = element.name.length;
    if (imie_dl == "") console.error("imie ma 0 długość");
    if (najkr_imie > imie_dl) {
      najkr_imie = imie_dl;
      sNajk_imie = element.name;
    }
    if (najdl_imie < imie_dl) {
      najdl_imie = imie_dl;
      sNajd_imie = element.name;
    }

    //najdłuższe nazwisko
    nazw_dl = element.surename.length;
    if (iNajdl_nazw < nazw_dl) {
      iNajdl_nazw = nazw_dl;
      sNajd_nazw = element.surename;
    }

    // ustawiamy zmienną czy wystąpiło już takie imię
    var bJestImie = false;
    // wyszukujemy imiona w naszej tablicy
    tabImiona.forEach((sImiezTab) => {
      //sprawdzamy czy takie imię jest w tablicy
      if (sImiezTab.sName == element.name) {
        //jest!
        bJestImie = true;
        //console.log(`Imie ${element.name} juz jest w tablicy`);
        sImiezTab.iIle++;
      }
    });
    if (bJestImie == false) {
      var oImie = new Object();
      oImie.sName = element.name;
      oImie.iIle = 1;
      tabImiona.push(oImie);
    }
  });

  console.log(`Ilość mężczyzn: ${m}, ilość kobiet: ${k}`);

  console.log(`najniższa osoba: ${niska_kreska}`);
  console.log(`najwyższa osoba: ${najwyzsza_kreska}`);

  console.log(`najkrótsze imie: ${najkr_imie} - ${sNajk_imie}`);
  console.log(`najdłuższe imie: ${najdl_imie} - ${sNajd_imie}`);

  console.log(`najdłuższe nazwisko: ${iNajdl_nazw} - ${sNajd_nazw}`);

  console.log(`imion jest ${tabImiona.length}`);
}

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
    if (iIlePrzejsc % 10000 == 0) console.log(`BS iter: ${iIlePrzejsc}`);
  }
  // wyświetlamy efektywność sortowania
  console.log(`przejsc sortowania bąbelkowego: ${iIlePrzejsc}`);
  for (let iIter1 = 0; iIter1 < 1000; iIter1++) {
    console.log(
      `nazwisko:${ludzie[iIter1].surename} imie: ${ludzie[iIter1].name}`
    );
  }
}

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

  for (let iIter1 = 0; iIter1 < 1000; iIter1++) {
    console.log(
      `nazwisko:${ludzie[iIter1].surename} imie: ${ludzie[iIter1].name}`
    );
  }
}



function WczytajWyrazyZPliku(){
  console.log('czytamy z pliku');
  line_no=0;
      
  rl2 = readline.createInterface({
      input: fs.createReadStream('./slowa_en.txt'),
      output: process.stdout,
      terminal: false
  });
  
  rl2.on('line', (line) => {
      if (line.length>0)
      {
        var user = new Object();            
        user.wyraz=line;
        wyrazy.push(user);
      }
      line_no++;
  });  

  rl2.on('close', function(line) {
    console.log('Total lines : ' + line_no);
    console.log('przeczytane :' + wyrazy.length);
    SelectionSortWyraz();
  });


}

function SelectionSortWyraz(){
  var wyrazy;
  wyrazy = require('./wyrazy-4-en.json');
   
  //sortowanie przez wybieranie
  iIlePrzejsc = 0;
  var iKtoraNajnizsza = 0;

  console.log("PRZED:")
  for(let iIter1=9998;iIter1<10001;iIter1++)
    {
      //if(wyrazy[iIter1].wyraz=="") console.log("pusta");
      console.log(wyrazy[iIter1].wyraz)    
    }





  console.log(`rozpoczynam sortowanie przez wybieranie`)
  for (var iIter2=0;iIter2<wyrazy.length;iIter2++)
  //for (var iIter2=0;iIter2<10000;iIter2++)
  {
    //ustawiamy początkowe wartości 
    niska_kreska = wyrazy[iIter2].wyraz;
    iKtoraNajnizsza = iIter2;

    //wyszukiwanie najmniejszej wartości
    for(var iIter1 = iIter2; iIter1 < wyrazy.length; iIter1++){
      //porównujemy najmniejszą znalezioną do tej pory z aktualną 
      if (niska_kreska > wyrazy[iIter1].wyraz){
        //znaleziona mniejsza - wstawiamy jako najmnijesza
        niska_kreska = wyrazy[iIter1].wyraz;
        //zapamiętujemy pozycję najmniejszej
        iKtoraNajnizsza = iIter1;
      }
      //efektywność algorytmu
      iIlePrzejsc++;
    }
    //zamieniamy miejscami najmniejszą i aktualną
    oCzlowiek = wyrazy[iKtoraNajnizsza];
    wyrazy[iKtoraNajnizsza]=wyrazy[iIter2];
    wyrazy[iIter2]=oCzlowiek;
    if (iIter2%1000==0) console.log(`SS iter: ${iIter2}`)  ;
  }

  console.log(`przejsc sortowania przez wybieranie: ${iIlePrzejsc}`)


  console.log("PO SORTOWANIU:")
  for(let iIter1 = 0; iIter1 < 1000; iIter1++)
    {
      console.log(`wyraz: ${wyrazy[iIter1].wyraz}`);
    }

}






//ZliczajStatystyki();
//WyrazoweZabawy();
//BubbleSort();
//SelectionSort();
//var wyrazy=[];
//WczytajWyrazyZPliku();
SelectionSortWyraz();
//Palindromek("ADAREMERADA");
//if (Palindromek("alamakotaisiegonieboia")){
//  console.log(`jestem palindromem!!!!: ${wejWyraz}`);
//}

/*
  tabImiona.forEach(element =>{
  //  console.log(element);
  });
  //coś tam
  // a tu moje coś tam
  //edit
// sus
  
*/

// GrabaraMaksymilian
// GrabaraAdam
// GrabaraAnna

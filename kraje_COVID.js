//ile jest różnych krajów, ilu mają mieszkańców itp, zabawy z danymi
var wyrazy = require("./cov-cases-1.json"); //wczytujemy dane dotyczące COV, ale zawierające listę krajów

var tab = []; //W tej tablicy zapisujemy wszystkie wyniki
let iPozycja = 0;

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
  //sprawdzanie czy w tablicy krajów występuje już dany kraj
  let bFound = false;
  for (let iIter2 = 0; iIter2 < tab.length;iIter2++)
  {
    if (tab[iIter2].nazwa==wyrazy[iIter1].countriesAndTerritories) bFound = true; // już jest taki
  }
  if (bFound==false) { //jeśli nie występował w tablicy tab[]
    var kraj = new Object(); //tworzymy nowy obiekt - kraj
    
    kraj.nazwa = wyrazy[iIter1].countriesAndTerritories; //uzupełniamy nazwę
    kraj.populacja = wyrazy[iIter1].popData2019; // ilość mieszkańców
    kraj.geoid = wyrazy[iIter1].geoId; // skrót nazwy
    kraj.kontynent = wyrazy[iIter1].continentExp; // na jakim kontynencie
    
    //tab.push(kraj); //dodajemy do tablicy
    if (kraj.kontynent == "Europe") tab.push(kraj); //dodajemy do tablicy - ale tylko jeśli jest z wybranego przez nas kontynentu -> przypisanie jest z PLIKU (niekoniecznie prawdziwe)
  }
}

// append_file.js

const fs = require('fs');

//let writeStream = fs.createWriteStream('./kraje.txt');

// write some data with a base64 encoding
//writeStream.write('aef35ghhjdk74hja83ksnfjk888sfsf');

// the finish event is emitted when all data has been flushed from the stream
//writeStream.on('finish', () => {
//    console.log('wrote all data to file');
//});

// close the stream
//writeStream.end();

// add a line to a lyric file, using appendFile

//let sLinia = `dupa`;
//  fs.appendFile('./kraje.txt', sLinia, (err) => {
//    if (err) throw err;
    //console.log('The lyrics were updated!');
//});
fs.writeFile('kraje_lista.txt', "Lista krajów:", (err) => {
  if (err) throw err;
  
});  
for (let iIter2 = 0; iIter2 < tab.length;iIter2++) //prezentujemy listę krajów z danymi
{ 
  console.log(`kraj= ${tab[iIter2].nazwa}, mieszkańcy:${tab[iIter2].populacja}, geoid:${tab[iIter2].geoid}, kontynent:${tab[iIter2].kontynent}`);
  let sLinia = `\nkraj= ${tab[iIter2].nazwa}, mieszkańcy:${tab[iIter2].populacja}, geoid:${tab[iIter2].geoid}, kontynent:${tab[iIter2].kontynent}`;
  fs.appendFile('kraje_lista.txt', sLinia, (err) => {
    if (err) throw err;
  });
}

//fs.close();

console.log(tab.length);



function RysujHistogram(tab, bOpis, iNormalizuj, iOptionalMaxValue = 100) {
  if (iOptionalMaxValue==0) iOptionalMaxValue = 100; 
  let tablica = [];
  let iLargest = 0;
  if (iNormalizuj == 1){
    // teraz normalizujemy wyniki względem największej ilości występowania
    // szukamy największej liczby w tablicy
    iLargest = tab[0].populacja;
    for (let iIter1 = 0; iIter1 < tab.length; iIter1++)
    {
      if (tab[iIter1].populacja>iLargest) iLargest=tab[iIter1].populacja;
    }
  }
  else if (iNormalizuj == 2)
  {
    // sumujemy wszystkie wartości i wyliczymy z nich sumę
    iLargest = tab[0].populacja;
    for (let iIter1 = 0; iIter1 < tab.length; iIter1++)
    {
      iLargest+=tab[iIter1].populacja;
    }
  }
  
  if (iNormalizuj == 0){
     iLargest = 100
  }
    //console.log (`największa ilość / suma  to: ${iLargest}`);
    // dla iNormalizuj = 1
    // dzielimy wszystkie wartości względem największej odnalezionej
    // oznacza to, że największa liczba będzie teraz 100%
    // dla iNormalizuj = 2
    // dzielimy wszystkie przez sumę - so oznacza prawdziwy udział "w torcie" 
    for (let iIter1=0; iIter1<tab.length; iIter1++)
    {
      tablica.push(Math.round(tab[iIter1].populacja/iLargest*100));
    }
  
    //tak wygląda tablica po normalizacji
    //console.log(tablica);
  


  for (let iIter3 = iOptionalMaxValue - 1; iIter3 >= 0; iIter3=iIter3-iOptionalMaxValue/10)
  {
    //console.log(`przebieg ${iIter3}`)
    let slinia = spacePad(iIter3, 4)+" "; // " 5"    ;
    for(let iIter2 = 0; iIter2 < tablica.length; iIter2++) {
      
      if (tablica[iIter2] >= iIter3) slinia=slinia+String.fromCharCode(73)+"  ";
      else slinia=slinia+"   ";
    }
    Loguj(slinia);
  }

  slinia = "----";
  for(let iIter2 = 0; iIter2 < tablica.length; iIter2++)
  {
    slinia = slinia + "---";
  }
  Loguj(slinia);
  
  slinia = "     ";

  for (let iIter1=0;iIter1<tablica.length;iIter1++)
  {
    if (bOpis) slinia = slinia + tab[iIter1].geoid+" ";
    else slinia = slinia + spacePadEnd(iIter1,2)+" ";
  }
  Loguj(slinia);
}


// funkcja dodaje spacje na początku liczby
function spacePad(num, places) {
var zero = places - num.toString().length + 1;
return Array(+(zero > 0 && zero)).join(" ") + num;
}

// funkcja dodaje spacje na końcu liczby 
function spacePadEnd(num, places) {
var zero = places - num.toString().length + 1;
return num + Array(+(zero > 0 && zero)).join(" ");
}

//wyświeltamy - parametry funkcji:
// tabelka -> tablica z wynikami
// false -> opis pod histogramem z CYFEREK, true -> opis z LITEREK
// włączamy funkcję ryzującą harmonogram
//var api2 = require('./histogram');

Loguj(`\n\nRozkład ilości mieszkańców w Europie - względem największego kraju (Rosji w całości)\n`);
RysujHistogram(tab, true, 2, 20)
//console.log(`rozkład długości wyrazów - rozkład względem największej liczby`);
//api2.RysujHistogram(tab, false, 1)
//console.log(`rozkład długości wyrazów - rozkład względem sumy wszystkich do 100%`);
//api2.RysujHistogram(tab, false, 2, 20)

function Loguj(sLinia){
  console.log(sLinia);
  fs.appendFile('kraje_wykres.txt', "\n"+sLinia, (err) => {
      if (err) throw err;
    });  
}
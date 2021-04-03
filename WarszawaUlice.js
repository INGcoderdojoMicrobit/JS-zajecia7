//ile jest różnych adresów w Warszawie itp, zabawy z danymi
var wyrazy = require("./warszawa.json"); //wczytujemy dane adresowe
/*
 {
   "OID": -1,
   "TERYT": 146501,
   "SIMC": 918123,
   "MIEJSCOWOSC": "Warszawa",
   "DZIELNICA": "Wesoła",
   "ULIC": 432,
   "NAZWA_ULICY": "ulica Armii Krajowej",
   "NUMER": "115",
   "X1992": 489453,
   "Y1992": 653046,
   "SZER_GEOGR": 52.249790563,
   "DL_GEOGR": 21.2426694420001,
   "X2000_S7": 5790719.508,
   "Y2000_S7": 7516571.846,
   "KAT_OBROTU": 354.9577,
   "AdresCSIOZ": "05075|146501|0918123|0918123|00432|489453|653046|115|"
 },
*/

var tab = []; //W tej tablicy zapisujemy wyniki ulic
var tab2 = []; //W tej tablicy zapisujemy wyniki dzielnic
var tab3 = []; //W tej tablicy zapisujemy wyniki typów ulic

let iPozycja = 0;
let iLowAddress = 99999999;
let iHighAddress = 0;

for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
  //sprawdzanie czy w tablicy ulic  występuje już dana ulica
  let bFound = false;
  for (let iIter2 = 0; iIter2 < tab.length;iIter2++)
  {
    if (tab[iIter2].nazwa==wyrazy[iIter1].NAZWA_ULICY) {
      bFound = true; // już jest taki
      tab[iIter2].ile_adresow++;
    }
  }
  if (bFound==false) { //jeśli nie występował w tablicy tab[]
    var ulica = new Object(); //tworzymy nowy obiekt - ulica
    
    ulica.nazwa = wyrazy[iIter1].NAZWA_ULICY; //uzupełniamy nazwę ulicy
    ulica.ile_adresow = 1; //ustawiamy ilość punktów adersowych
    ulica.typ = ulica.nazwa.substring(0,ulica.nazwa.search(" ")); //uzupełniamy typ ulicy (np. Plac, Rynek)
    ulica.dzielnica = wyrazy[iIter1].DZIELNICA; //uzupełniamy nazwę dzielnicy
    
    if (ulica.nazwa.length>0) tab.push(ulica); //dodajemy do tablicy - ale tylko jeśli jest z wybranego przez nas kontynentu -> przypisanie jest z PLIKU (niekoniecznie prawdziwe)
  }
}


for (let iIter1 = 0; iIter1 < tab.length - 1; iIter1++) {
  //sprawdzanie czy w tablicy dzielnic występuje już dana dzielnica
  bFound = false;
  for (let iIter2 = 0; iIter2 < tab2.length;iIter2++)
  {
    if (tab2[iIter2].nazwa==tab[iIter1].dzielnica) {
      bFound = true; // już jest taki
      tab2[iIter2].ile_ulic++;
    }
  }
  if (bFound==false) { //jeśli nie występował w tablicy tab2[]
    var dzielnica = new Object(); //tworzymy nowy obiekt - dzielnica
    
    dzielnica.nazwa = tab[iIter1].dzielnica; //uzupełniamy nazwę
    dzielnica.ile_ulic = 1;
    
    if (dzielnica.nazwa.length>0) tab2.push(dzielnica); //dodajemy do tablicy
  }

  //sprawdzanie czy w tablicy typów ulic występuje już dany typ
  bFound = false;
  for (let iIter2 = 0; iIter2 < tab3.length;iIter2++)
  {
    if (tab3[iIter2].nazwa==tab[iIter1].typ) {
      bFound = true; // już jest taki
      tab3[iIter2].ile_ulic++;
    }
  }
  if (bFound==false) { //jeśli nie występował w tablicy tab3[]
    var typulicy = new Object(); //tworzymy nowy obiekt - typulicy
    
    typulicy.nazwa = tab[iIter1].typ; //uzupełniamy nazwę
    typulicy.ile_ulic = 1;
    
    if (typulicy.nazwa.length>0) tab3.push(typulicy); //dodajemy do tablicy
  }
}

// append_file.js

const fs = require('fs');
fs.writeFile('warszawa_lista_ulic.txt', "\n\nLista ulic w Warszawie:", (err) => {
  if (err) throw err;
  
});  
for (let iIter2 = 0; iIter2 < tab.length;iIter2++) //prezentujemy listę ulic
{ 
  let sLinia = `${tab[iIter2].nazwa}, adresów: ${tab[iIter2].ile_adresow}`;
  console.log(sLinia);
  fs.appendFile('warszawa_lista_ulic.txt', "\n"+sLinia, (err) => {
    if (err) throw err;
  });
  if (tab[iIter2].ile_adresow>iHighAddress) iHighAddress=tab[iIter2].ile_adresow;
  if (tab[iIter2].ile_adresow<iLowAddress) iLowAddress=tab[iIter2].ile_adresow;
}
let sLinia = `najmniej adresów: ${iLowAddress}, najwięcej adresów: ${iHighAddress}`;
console.log(sLinia);
fs.appendFile('warszawa_lista_ulic.txt', "\n"+sLinia, (err) => {
    if (err) throw err;
  });

fs.appendFile('warszawa_lista_ulic.txt', "\n\nLista dzielnic w Warszawie:", (err) => {
    if (err) throw err;
    
  });  
  for (let iIter2 = 0; iIter2 < tab2.length;iIter2++) //prezentujemy listę dzielnic
  { 
    let sLinia = `${tab2[iIter2].nazwa}, ulic: ${tab2[iIter2].ile_ulic}`;
    console.log(sLinia);
    fs.appendFile('warszawa_lista_ulic.txt', "\n"+sLinia, (err) => {
      if (err) throw err;
    });
  }

  fs.appendFile('warszawa_lista_ulic.txt', "\n\nLista typów ulic w Warszawie:", (err) => {
    if (err) throw err;
    
  });  
  for (let iIter2 = 0; iIter2 < tab3.length;iIter2++) //prezentujemy listę typów ulic
  { 
    let sLinia = `${tab3[iIter2].nazwa}, ulic: ${tab3[iIter2].ile_ulic}`;
    console.log(sLinia);
    fs.appendFile('warszawa_lista_ulic.txt', "\n"+sLinia, (err) => {
      if (err) throw err;
    });
  }


//fs.close();

console.log(tab.length);

//Loguj(`\n\nRozkład ilości mieszkańców w Europie - względem największego kraju (Rosji w całości)\n`);
//RysujHistogram(tab, true, 2, 20)




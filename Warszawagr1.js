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
   "NAZWA_ULICY": "Plac Armii Krajowej",
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

//główna pętla wyszukująca dane w wejściowej tablicy 'wyrazy[]' zawierającej gołego JSONa z pliku
for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {

    // tutaj wyszukujemy UNIKALNE nazwy ulic, które nir występują w tablicy tab[]
    let bFound = false; // ustawiamy zmienną - na "nie ma takiej ulicy w tablicy tab[]
    for (let iIter2=0; iIter2 < tab.length; iIter2++){ //przeszukujemy całą tablicę tab[]
      if (tab[iIter2].nazwa == wyrazy[iIter1].NAZWA_ULICY){ //jeśli znaleźliśmy już taką ulicę
        bFound = true; //taka ulica już istnieje w tablicy tab - ustawiamy zmienną na true
        tab[iIter2].ile_adresow++; // mamy kolejny adres na tej ulicy (już istniejącej w tablicy tab[]) - zliczamy go
      }
    }

    //jak nie było takiej ulicy w tablicy tab[]
    if (!bFound)
    {
      var ulica = new Object(); //tworzymy nowy obiekt - ulica
      
      ulica.nazwa = wyrazy[iIter1].NAZWA_ULICY; //uzupełniamy nazwę ulicy
      ulica.ile_adresow = 1; //ustawiamy ilość punktów adersowych - na początkowoą wartość 1
      ulica.typ = ulica.nazwa.substring(0,ulica.nazwa.search(" ")); //uzupełniamy typ ulicy (np. Plac, Rynek)
      ulica.dzielnica = wyrazy[iIter1].DZIELNICA; //uzupełniamy nazwę dzielnicy
      if (ulica.nazwa.length>0) tab.push(ulica); //dodajemy do tablicy
    }
}

//pomysł pixela na listę typów ulic, wykorzystany przez MaksaG do szukania dzielnic
// przeszukujemy już stworzoną tablicę tab[] zawierającą unikalne nazwy ulic
tab.forEach(o => {
  //gdy nic nie mamy w tablicy tab2[] z dzielnicami dodajemy pierwszą wartość która występuje
  if (!tab2[0]) {
    tab2.push(o.dzielnica);
  }
  else {
    //sprawdzamy, czy mamy już to w tablicy tab2
    var is = false; //na początku ustawiamy zmienną is na false (czyli, że nie ma takiej wartości)
    tab2.forEach(t => { // przeszukujemy całą tablicę tab2[]
      //jeśli znaleźliśmy to w tablicy to ustawimy ją na true
      if (o.dzielnica == t) is = true;
    });
    //jeśli tej dzielnicy nie mamy w tablicy tab2[] to dopisujemy
    if (!is) {
      tab2.push(o.dzielnica);
    }
  }
});


//pomysł pixela na wyszukanie unikalnych typów ulic
tab.forEach(o => {
  //gdy nic nie mamy w tablicy dodajemy pierwszą wartość która występuje
  if (!tab3[0]) {
    tab3.push(o.typ);
  }
  else {
    //sprawdzamy, czy mamy już to w tablicy tab3
    var is = false; //na początku ustawioamy zmienną is na false (czyli, że nie ma takiej wartości)
    tab3.forEach(t => {
      //jeśli znaleźliśmy to w tablicy to ustawimy ją na true
      if (o.typ == t) is = true;
    });
    //jeśli tego typu nie mamy w tablicy to dopisujemy
    if (!is) {
      tab3.push(o.typ);
    }
  }
});


for (let iIter2 = 0; iIter2 < tab.length;iIter2++) //prezentujemy listę ulic
{ 
  let sLinia = `${tab[iIter2].nazwa} typ ulicy: ${tab[iIter2].typ} ilość adresów:  = ${tab[iIter2].ile_adresow}`;
  console.log(sLinia); 
}

console.log("typy ulic w Warszawie:")
console.log(tab3)
console.log("dzielnice Warszawy:")
console.log(tab2)

console.log("koniec")


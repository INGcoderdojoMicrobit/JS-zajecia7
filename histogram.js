/*
  ____        _                               _              _
 |  _ \  ___ | | ___   _ _ __ ___   ___ _ __ | |_ __ _  ___ (_) __ _
 | | | |/ _ \| |/ / | | | '_ ` _ \ / _ \ '_ \| __/ _` |/ __|| |/ _` |
 | |_| | (_) |   <| |_| | | | | | |  __/ | | | || (_| | (__ | | (_| |
 |____/ \___/|_|\_\\__,_|_| |_| |_|\___|_| |_|\__\__,_|\___|/ |\__,_|
                                                          |__/

tu coś trzeba napisać, bo każdy dobry lib ma dokumentację
*/
//MaksG
//var wyrazy = require("./wyrazy-2.json");

// nasza lokalna tablica
// iNormalizuj = 0 -> nic nie rób z danymi 
//             = 1 -> normalizuj względem największej
//             = 2 -> policz względem sumy

module.exports = {
  RysujHistogram: function(tab, bOpis, iNormalizuj, iOptionalMaxValue = 100) {
    if (iOptionalMaxValue==0) iOptionalMaxValue = 100; 
    let tablica = [];
    let iLargest = 0;
    if (iNormalizuj == 1){
      // teraz normalizujemy wyniki względem największej ilości występowania
      // szukamy największej liczby w tablicy
      iLargest = tab[0];
      for (let iIter1 = 0; iIter1 < tab.length; iIter1++)
      {
        if (tab[iIter1]>iLargest) iLargest=tab[iIter1];
      }
    }
    else if (iNormalizuj == 2)
    {
      // sumujemy wszystkie wartości i wyliczymy z nich sumę
      iLargest = tab[0];
      for (let iIter1 = 0; iIter1 < tab.length; iIter1++)
      {
        iLargest+=tab[iIter1];
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
        tablica.push(Math.round(tab[iIter1]/iLargest*100));
      }
    
      //tak wygląda tablica po normalizacji
      //console.log(tablica);
    


    for (let iIter3 = iOptionalMaxValue - 1; iIter3 >= 0; iIter3=iIter3-iOptionalMaxValue/10)
    {
      //console.log(`przebieg ${iIter3}`)
      let slinia = spacePad(iIter3, 8)+" "; // " 5"    ;
      for(let iIter2 = 0; iIter2 < tablica.length; iIter2++) {
        
        if (tablica[iIter2] >= iIter3) slinia=slinia+String.fromCharCode(73)+"  ";
        else slinia=slinia+"   ";
      }
      console.log(slinia);
    }

    slinia = "--------";
    for(let iIter2 = 0; iIter2 < tablica.length; iIter2++)
    {
      slinia = slinia + "---";
    }
    console.log(slinia);
    slinia = "         ";

    for (let iIter1=0;iIter1<tablica.length;iIter1++)
    {
      if (bOpis) slinia = slinia + String.fromCharCode(iIter1+65)+"  ";
      else slinia = slinia + spacePadEnd(iIter1,2)+" ";
    }
    
    console.log(slinia);

  }
}


function spacePad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join(" ") + num;
}


function spacePadEnd(num, places) {
  var zero = places - num.toString().length + 1;
  return num + Array(+(zero > 0 && zero)).join(" ");
}

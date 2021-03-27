var fs = require("fs");
var rl2;
const readline = require('readline');

var m = 0;
var k = 0;
var niska_kreska;
var najwyzsza_kreska;


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
  var wyrazy=[];
  wyrazy = require('./wyrazy-4-en.json');
  //wyrazy = require('./wyrazy-2.json');
   
  //sortowanie przez wybieranie
  iIlePrzejsc = 0;
  var iKtoraNajnizsza = 0;

  console.log("PRZED:")
  for(let iIter1=0;iIter1<100;iIter1++)
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
  for(let iIter1 = 0; iIter1 < 100; iIter1++)
    {
      console.log(`wyraz: ${wyrazy[iIter1].wyraz}`);
    }

}






//var wyrazy=[];
//WczytajWyrazyZPliku();
SelectionSortWyraz();

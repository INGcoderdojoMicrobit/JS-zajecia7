var express = require("express");
const { symlinkSync } = require("fs");
var app = express();
const path = require('path');
const router = express.Router();

function reportdate()
{
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  return `${year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}`; 

}



function liczdlugosci()
{

  var wyrazy = require("./wyrazy-2.json");
  //var wyrazy = require("./wyrazy-4-en.json");

  var tabelka = []; //W tej tablicy zapisujemy wszystkie wyniki
  let iPozycja = 0;

  function dlugoscwyrazu(wejWyraz) {
    //sprawdzanie - zwracam długość wyrazu
    //console.log(`wyraz: ${wejWyraz}`);
    return wejWyraz.length;
  }

  //inicjowanie tablicy wyników -> na razie zakłądamy, że nie będzie wyrazów dłuższych niż 40 literek
  for (let iIter1 = 0; iIter1 < 40; iIter1++) {
    zawartosc = new Object()
    zawartosc.numer = iIter1;
    zawartosc.dlugosc = 0;
    tabelka.push(zawartosc);
  };

  for (let iIter1 = 0; iIter1 < wyrazy.length - 1; iIter1++) {
      iPozycja = dlugoscwyrazu(wyrazy[iIter1].wyraz);
    if (iPozycja<100) {
      tabelka[iPozycja].dlugosc++;
    }
  }

  console.log(`wyrazow jest ${wyrazy.length}`);
  return JSON.stringify(tabelka);
}

router.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food","Anna","Maksio"]);
   });

router.get("/url2", (req, res, next) => {
    
    res.json(liczdlugosci());

   });




router.get('/',function(req,res){
  console.log(`get/ -> wysyłam plik index.html ${reportdate()}`) 
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.use('/', router);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(3000, () => {
    console.log("Server running on port 3000");
   });
   
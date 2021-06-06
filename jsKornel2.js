//mnożenie liczb pisemnie
//////////////

var liczba1 ="9845"
var liczba2 ="1791"

var iIloczyn = 0
var iZmienna = 0
let sSuma = "0"
let sSumaCz = ""
let iZero = 0


// na samym początku uzupełniamy liczby aby były takiej samej długości
while(liczba1.length != liczba2.length)
{
  if (liczba1.length < liczba2.length)
  {
    liczba1 = "0" + liczba1
  }
  else
  {
    liczba2 = "0" + liczba2
  }
  console.log(`liczba1=${liczba1}, liczba2=${liczba2}`)
}


// potem mamy dwie pętle - pierwsza przesuwa się po "dolnej" liczbie, druga po górnej
for (let iter1 = liczba2.length - 1; iter1 >=0; iter1--)
{
  sSumaCz = "" //zerujemy sumę cząstkową - wyliczaną w każdej iteracji
  iZmienna = 0 // przy pierwszej cyfrze z prawej strony nie ma czego dodawać "z pamięci"
  for (let iter2 = liczba1.length - 1; iter2 >=0; iter2--)
  {
    // mnożymy cyfry nie zapomnijąc dodać "reszty" pozostałej z poprzedniego kroku
    iIloczyn = parseInt(liczba1[iter2]) * parseInt(liczba2[iter1]) + iZmienna
    if (iIloczyn>=10) //jeśli przekraczamy 10 trzeba zapamiętać ile dziesiątek dodamy w kolejnym kroku
    {
      iZmienna = Math.floor(iIloczyn/10) // dzielimy przez 10 i bierzemy mniejszą całkowitą liczbę
      iIloczyn = iIloczyn % 10 // reszta z dzielenia - będzie dopisana jako wynikowa
    }
    else
    {
      iZmienna = 0 // nie musimy zapamiętać nic, było <10
    }

    sSumaCz = iIloczyn.toString() + sSumaCz // do sumy cząstkowej dopisujemy wynik mnożenia (tylko jedną cyfrę, druga jest "w pamięci" -> iZmienna)
    console.log(`iter1=${iter1}, iter2=${iter2}, iIloczyn=${iIloczyn} liczba1=${liczba1}, liczba2=${liczba2}, iZmienna=${iZmienna}, sSumaCz=${sSumaCz}`)
  }

  if (iZmienna > 0) //jeśli coś nam zostało "w pamięci" trzeba dopisać z przodu do wyniku
  {
      sSumaCz = iZmienna.toString() + sSumaCz
  }

  // uzupełniamy sumę cząstkową o zera na końcu -> tyle zer aby pod dobrą cyfrą się ustawić
  for (let i=0; i<iZero; i++)
  {
    sSumaCz = sSumaCz +"0"
  }
  iZero++ //za każdym kolejnym razem - zwiększamy o jedno zero więcej

  // sumujemy sumę cząstkową do naszej całkowitej sumy mnożonych liczb
  
  var iSuma = 0
  let sDodawanie = ""
  iZmienna = 0

  // uzupełniamy zerami na początku obie dodawane liczby aby miały tę samą długośź (jako tekst)
  while(sSumaCz.length != sSuma.length)
  {
    if (sSumaCz.length < sSuma.length)
    {
      sSumaCz = "0" + sSumaCz
    }
    else
    {
      sSuma = "0" + sSuma
    }
  }
  //mamy uzupełnione zerami liczby
  console.log(`liczba1=${sSumaCz}, liczba2=${sSuma}`)

  // dodawanie - też pisemnie
  for (let iter = sSumaCz.length - 1; iter >=0; iter--)
  {
    iSuma = parseInt(sSumaCz[iter]) + parseInt(sSuma[iter]) + iZmienna // koeljne ceyfry od prawej plus "z pamięci"
    if (iSuma>=10) //jeśli suma większa od 9, odejmujemy i zapamiętujęmy tę "jednynkę"
    {
      iSuma = iSuma - 10
      iZmienna = 1
    }
    else{
      iZmienna = 0
    }

    sDodawanie = iSuma.toString() + sDodawanie //dopsujemy cyfrę do wyniku
    //console.log(`Dodawanie iter=${iter}, iSuma=${iSuma} liczba1=${sSumaCz}, liczba2=${sSuma}, iZmienna=${iZmienna}, sSuma=${sDodawanie}`)
  }

  // jeśli została nam "w pamięci" jedynka - trzeba ją jeszcze dodać
  if (iZmienna == 1)
  {
      sDodawanie = "1" + sDodawanie
  }
  //w sDodawanie mamy wynik dodawania cząstkowej sumy do całkowitej sumy
  sSuma = sDodawanie
  //console.log(`liczba1=${liczba1}, liczba2=${liczba2}, sSuma=${sSuma}`)
}

sWynik = ""
bJuzCyfra = false //usuwamy początkowe zera
for (let i=0; i<sSuma.length; i++)
{
  //console.log(`i=${i}, sSuma[${i}]=${sSuma[i]}`)
  if (sSuma[i]=="0" && bJuzCyfra == false)
  {
    //nic nie robię - nie przepisuję tej cyfry
  }
  else
  {
    sWynik = sWynik + sSuma[i]
    bJuzCyfra = true
  }
  //console.log(`i=${i}, sWynik=${sWynik}`) //mamy wynik - już bez zer na początku
}

console.log(`Wynik mnożenia liczba1=${liczba1} * liczba2=${liczba2} => sWynik=${sWynik}`)
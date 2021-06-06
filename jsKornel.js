//dodawanie liczb
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var liczba1 ="123"
var liczba2 ="5"

var iSuma = 0
var iZmienna = 0
let sSuma = ""


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

for (let iter = liczba1.length - 1; iter >=0; iter--)
{
  iSuma = parseInt(liczba1[iter]) + parseInt(liczba2[iter]) + iZmienna
  if (iSuma>=10)
  {
    iSuma = iSuma - 10
    iZmienna = 1
  }
  else{
    iZmienna = 0
  }

  sSuma = iSuma.toString() + sSuma
  console.log(`iter=${iter}, iSuma=${iSuma} liczba1=${liczba1}, liczba2=${liczba2}, iZmienna=${iZmienna}, sSuma=${sSuma}`)
}


if (iZmienna == 1)
{
    sSuma = "1" + sSuma
}
  
console.log(`iSuma=${iSuma} liczba1=${liczba1}, liczba2=${liczba2}, iZmienna=${iZmienna}, sSuma=${sSuma}`)
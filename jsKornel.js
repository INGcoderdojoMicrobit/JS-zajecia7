//dodawanie liczb

var liczba1 ="19234"
var liczba2 ="349"

var iSuma = 0
var iZmienna = 0

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
}

for (let iter = liczba1.length - 1; iter >=0; iter--)
{
  iSuma = parseInt(liczba1[iter]) + parseInt(liczba2[iter])
  console.log(`iter=${iter}, iSuma=${iSuma} liczba1=${liczba1}, liczba2=${liczba2}`)
}

console.log(`liczba1=${liczba1}, liczba2=${liczba2}`)
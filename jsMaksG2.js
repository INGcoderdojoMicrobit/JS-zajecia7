//dodawanie liczb binarnie

var liczba1 ="10100010010011"
var liczba2 ="101"
var liczba3 = 567
var liczba4 = ""
//liczba1 ="10100010010011"
//liczba2 ="00000000000101"
//wynik   ="10100010011000"

var suma = ""
let i = 0, iSuma
let zmienna = 0
while(liczba3>0){
  if(liczba3%2==0){
    liczba3 = Math.floor(liczba3/2)
    liczba4 = liczba4 + "0"
    console.log(`Liczba w zapisie binarnym: ${liczba4}, Liczba: ${liczba3}`)
  }
  else{
    liczba3 = Math.floor(liczba3/2)
    liczba4 = liczba4 + "1"
    console.log(`Liczba w zapisie binarnym: ${liczba4}, Liczba: ${liczba3}`)
  }
}
console.log(`Liczba w zapisie binarnym: ${liczba4}`)
while(liczba1.length!=liczba2.length){
  if(liczba1.length>liczba2.length){
    liczba2="0" + liczba2
  }
  if(liczba1.length<liczba2.length){
    liczba1="0" + liczba1
  }
}
console.log(`Pierwsza liczba: ${liczba1}, Druga liczba: ${liczba2}`)

for(i = liczba1.length-1; i >= 0; i-- ){
  iSuma = parseInt(liczba1[i]) + parseInt(liczba2[i]) + zmienna;
  //console.log(`iter=${i}, iSuma=${iSuma}`)
  if(iSuma <= 1)
  {
    suma = iSuma.toString() + suma
    zmienna = 0
    //console.log(`iter=${i}, suma=${suma}, zmienna=${zmienna}`)
  }
  else 
  {
    iSuma = iSuma - 2
    suma= iSuma.toString() + suma
    zmienna = 1
    //console.log(`iter=${i}, suma=${suma}, zmienna=${zmienna}`)
  }
  console.log(`iter=${i}, suma=${suma}, zmienna=${zmienna}`)
}

// jeśli została nam do dodania jeszcze jedna "dziesiątka"
if(zmienna > 0)
{
  suma = "1" + suma
}

console.log(`Suma liczb wynosi: ${suma}`)


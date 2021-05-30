//dodawanie liczb

var liczba1 ="19234"
var liczba2 ="83456"
var suma = ""
let sSuma = ""
let sZmienna = ""
let i = 0, iSuma
let zmienna = 0

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
  if(iSuma <= 9)
  {
    suma = iSuma.toString() + suma
    zmienna = 0
  }
  else 
  {
    iSuma = iSuma - 10
    suma= iSuma.toString() + suma
    zmienna = 1
  }
  sSuma=suma
  sZmienna = zmienna.toString()
  for (let x=0; x<i;x++){sSuma=" "+sSuma; sZmienna = " "+sZmienna}

  console.log(`krok ${liczba1.length-i}: ${sZmienna}`)
  console.log(`        ${liczba1}`)
  console.log(`      + ${liczba2}`)
  console.log(`      = ${sSuma}`)

}

// jeśli została nam do dodania jeszcze jedna "dziesiątka"
if(zmienna > 0)
{
  suma = "1" + suma
  console.log(`krok ${liczba1.length+1}:${sZmienna}`)
  console.log(`        ${liczba1}`)
  console.log(`      + ${liczba2}`)
  console.log(`      =${suma}`)

}

console.log(`Suma liczb wynosi: ${suma}`)


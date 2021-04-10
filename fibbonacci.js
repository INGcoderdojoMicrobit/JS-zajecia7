//dodajemy globalną zmienną zliczającą ilość wywołań funkcji
var iIle=0;
//dodajemy flagę - czt wyświetlać poszczególne kroki wywołania
var bDebug = true;

//funkcja rekurencyjnie wylicza wartość 'num' wyrazu ciągu Fibbonacciego
// według wzroru:
// dla num = 0  -> 0 
// dla num = 1  -> 1 
// dla num > 1  -> fib (num-1) + fib (num-2) czyli sumę dwóch poprzednich wyrazów
function fib(num){
    iIle++; // zwiększamy globalny licznik
    if (num < 0) {console.error("błędne dane"); process.abort();}
    if (num < 2) {
      return num; // jeśli 0 lub 1 - zwracamy tę wartość jako wynik
    }
    if (bDebug) console.log(`${iIle}; num=${num} wołam fib(${num-1}) + fib(${num-2})`);
    let iSum = fib(num - 1) + fib(num - 2); // jeśli > 1 - zwracamy sumę rekurencyjnie wyliczonych wartości dwóch poprzednich wyrazów
    if (bDebug) console.log(`${iIle}; num=${num} wołam fib(${num-1}) + fib(${num-2}) = ${iSum}`);
    return iSum;
  };

let iKtory = 5;
console.log(`${iKtory} wyraz ciągu Fibbonacciego = ${fib(iKtory)}, wyliczenie zajęło ${iIle} wywołań funkcji fib()`)


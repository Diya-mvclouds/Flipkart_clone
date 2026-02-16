function finalSingleDigit(...numbers){
    let sum = numbers.reduce((total,num) => total + num, 0);
    console.log("Sum:", sum);
    while (sum >= 10){
        sum = sum.toString().split('').reduce((product, digit) => product * Number(digit), 1);
        console.log("Product", sum);
    }
}
console.log(finalSingleDigit(16,28));
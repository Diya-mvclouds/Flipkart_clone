function islargestswap(num){
    const swapped = Number(num.toString().split('').reverse().join(''));
    return num >= swapped;
}
console.log(islargestswap(23))
function rightshift(num, shift){
    return Math.floor(num / Math.pow(2, shift));
}
console.log(rightshift(44,2))
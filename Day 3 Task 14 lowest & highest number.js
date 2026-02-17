function highlow(str){
    let n = str.split(' ').map(Number);
    return `${Math.max(...n)} ${Math.min(...n)}`;
}
console.log(highlow("1 2 3 4 5"))
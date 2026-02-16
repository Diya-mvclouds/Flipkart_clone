function factors(n){
    const result = [];
    for (let i = 1; i <=n; i++){
        if (n % i == 0) result.push(i);
    }
    return result;
}
console.log(factors(144))
console.log(factors(13))
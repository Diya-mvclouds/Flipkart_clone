function ascii(str){
    let a = "";
    for (const char of str){
        let ch = char.charCodeAt(0);
        a += ch % 2 == 0 ? char.toUpperCase() : char.toLowerCase();
    }
    return a;
}
console.log(ascii('LITTLE'))
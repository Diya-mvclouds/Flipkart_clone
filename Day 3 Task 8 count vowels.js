function remove_vowels(str){
    let count = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    for (const char of str){
        if (vowels.includes(char)){
            count++;
        }
    }
    return count;
}
console.log(remove_vowels("Good Morning"))
console.log(remove_vowels("Have A Nice Day"))
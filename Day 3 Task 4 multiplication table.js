const prompt = require("prompt-sync")({sigint: true});
let n = prompt("Enter a number: ");
for (let i = 1; i <= 10; i++) {
    console.log(`${n} x ${i} = ${n * i}`);
}
const os = require('os');
const fs = require('fs');

const calculate = function (input) {
};


function main() {
    const inputFile = fs.readFileSync('input');
    const inputString = inputFile.toString();
    const inputArray = inputString.split(os.EOL);
    const numArray = inputArray.map(x => +x);
    const result = calculate(numArray);
    console.log('RESULT', result);
}

function test(input, ex) {
    const result = calculate(input);
    if (result != ex && JSON.stringify(result) != JSON.stringify(ex)) {
        throw `expected ${ex} doesn't equals result: ${result}` + ' for input: ' + input;
    }
    console.log('test succeeded with input: ' + input + ', result: ' + result)
}

console.time('A');
//test([1, 1, 1], 3);
//test([1, 1, -2], 0);
//test([-1, -2, -3], -6);
main();
console.timeEnd('A');

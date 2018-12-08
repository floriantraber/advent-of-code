const os = require('os');
const fs = require('fs');

const calculate = function (frequencies) {
    let currentFrequency = 0;
    let foundFrequencies = new Set();
    let i = 0;
    while (true) {
        currentFrequency += frequencies[i];
        if (foundFrequencies.has(currentFrequency)) {
            return currentFrequency;
        }
        foundFrequencies.add(currentFrequency);
        i = i < frequencies.length - 1 ? i++ : 0;
    }
};


function main() {
    const numArray = fs.readFileSync('input').toString().split(os.EOL);
    const result = calculate(numArray);
    console.log(result);
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

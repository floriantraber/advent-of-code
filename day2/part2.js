const os = require('os');
const fs = require('fs');

const calculate = function (ids) {
    for (let i = 0; i < ids.length - 1; i++) {
        const id = ids[i];
        for (let j = i + 1; j < ids.length; j++) {
            let noOfDifferences = 0;
            let idWithoutDifference = '';
            for (let y = 0; y < id.length; y++) {
                if (id[y] !== ids[j][y]) {
                    noOfDifferences++;
                    if (noOfDifferences > 1) {
                        break;
                    }
                } else {
                    idWithoutDifference += id[y];
                }
            }
            if (noOfDifferences === 1) {
                return idWithoutDifference;
            }
        }
    }
};


function main() {
    const inputFile = fs.readFileSync('input');
    const inputString = inputFile.toString();
    const inputArray = inputString.split(os.EOL);
    const result = calculate(inputArray);
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
test([
    "abcde",
    "fghij",
    "klmno",
    "pqrst",
    "fguij",
    "axcye",
    "wvxyz"

], 'fgij');
main();
console.timeEnd('A');


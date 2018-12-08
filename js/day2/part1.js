
const os = require('os');
const fs = require('fs');

const calculate = function (ids) {
    let noOfLettersTwice = 0;
    let noOfLettersThrice = 0;
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const map = new Map();
        for (let j = 0; j < id.length; j++) {
            const key = id[j];
            const currentCount = map.get(key) || 0;
            map.set(key, currentCount + 1);
        }
        const counts = Array.from(map.values()).filter(x => x === 2 || x === 3);
        if (counts.some(x => x === 2)) {
            noOfLettersTwice++;
        }
        if (counts.some(x => x === 3)) {
            noOfLettersThrice++;
        }
    }
    return noOfLettersTwice * noOfLettersThrice;
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
test(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'], 12);
main();
console.timeEnd('A');

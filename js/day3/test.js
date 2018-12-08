const os = require('os');
const fs = require('fs');

const calculate = function (rawClaims) {
  const doublesSet = new Set();
  const untouchedClaims = new Set();
  const matrix = new Array(1000)
    .fill(null)
    .map(item => (new Array(1000)));
  rawClaims.forEach(claimString => {
    const idSplit = claimString.split(' @ ');
    const id = idSplit[0].split('#')[1];
    const leftSplit = idSplit[1].split(',');
    const left = Number(leftSplit[0]);
    const top = Number(leftSplit[1].split(': ')[0]);
    const wide = Number(leftSplit[1].split(': ')[1].split('x')[0]);
    const tall = Number(leftSplit[1].split(': ')[1].split('x')[1]);

    untouchedClaims.add(id);
    const xLimit = left + 1 + wide;
    const yLimit = 1000 - 1 - top - tall;
    for (let x = left + 1; x < xLimit; x++) {
      for (let y = 1000 - 1 - top; y > yLimit; y--) {
        if (!matrix[x][y]) {
          matrix[x][y] = new Set();
        }
        matrix[x][y].add(id);
        if (matrix[x][y].size > 1) {
          doublesSet.add(x + '#' + y);
          matrix[x][y]
            .forEach(idToDelete => {
              untouchedClaims.delete(idToDelete);
            });
        }
      }
    }

  });
  const noOfDoubles = doublesSet.size;
  console.log(noOfDoubles);
  console.log(untouchedClaims);
  return untouchedClaims.values().next().value;
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
  console.log('test succeeded with input: ' + input + ', result: ' + result);
}

console.time('A');
test([
  '#1 @ 1,3: 4x4',
  '#2 @ 3,1: 4x4',
  '#3 @ 5,5: 2x2',

], '3');
main();
console.timeEnd('A');


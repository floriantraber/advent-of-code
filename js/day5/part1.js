const os = require('os');
const fs = require('fs');

const calculate = function (input) {
  let changed = false;
  do {
    changed = false;
    for (let i = 0; i < input.length - 1; i++) {
      if (input[i].toLowerCase() === input[i + 1].toLowerCase()
        &&
        ((input[i] === input[i].toLowerCase() && input[i + 1] === input[i + 1].toUpperCase())
          ||
          (input[i] === input[i].toUpperCase() && input[i + 1] === input[i + 1].toLowerCase())
        )) {
        changed = true;
        input = input.substring(0, i) + input.substring(i + 2);
      }
    }
  } while (changed);
  return input.length;
};


function main() {
  const inputFile = fs.readFileSync('input');
  const inputString = inputFile.toString();
  const result = calculate(inputString);
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
test('dabAcCaCBAcCcaDA', 10);
main();
console.timeEnd('A');


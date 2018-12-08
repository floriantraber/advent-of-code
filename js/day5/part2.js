const os = require('os');
const fs = require('fs');

function shorten(input) {
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
  return input;
}

const calculate = function (input) {
  input = shorten(input);
  let shortest = input.length;
  const abc = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < abc.length; i++) {
    const inputTemp = input.replace(new RegExp(abc[i], 'gi'), '');
    const resultTemp = shorten(inputTemp);
    if (resultTemp.length < shortest) {
      shortest = resultTemp.length;
    }
  }
  return shortest;
};


function main() {
  const inputFile = fs.readFileSync('input');
  const inputString = inputFile.toString();
  const result = calculate(inputString);
  console.log('RESULT', result);
}

function part2(input, ex) {
  const result = calculate(input);
  if (result != ex && JSON.stringify(result) != JSON.stringify(ex)) {
    throw `expected ${ex} doesn't equals result: ${result}` + ' for input: ' + input;
  }
  console.log('test succeeded with input: ' + input + ', result: ' + result);
}

console.time('A');
part2('dabAcCaCBAcCcaDA', 4);
main();
console.timeEnd('A');


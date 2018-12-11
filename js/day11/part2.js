const os = require('os');
const fs = require('fs');

const calculate = function (input) {
  const grid = [];
  const gridSerialNumber = +input;
  for (let x = 0; x < 300; x++) {
    grid[x] = [];
    for (let y = 0; y < 300; y++) {
      const rackId = x + 10;
      let powerLevel = rackId * y + gridSerialNumber;
      powerLevel *= rackId;
      const powerLevelStr = powerLevel + '';
      powerLevel = +(powerLevelStr.substring(powerLevelStr.length - 3, powerLevelStr.length - 2));
      grid[x][y] = powerLevel - 5;
    }
  }

  let maxSquareValue = 0;
  let maxSquareX;
  let maxSquareY;
  let squareVal = 0;
  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      for (let square = 1; square < (300 - x) && square < (300 - y); square++) {
        let val = 0;
        for (let i = 0; i < square; i++) {
          for (let a = 0; a < square; a++) {
            val += grid[x + i][y + a];
          }
        }
        if (val > maxSquareValue) {
          maxSquareValue = val;
          maxSquareX = x;
          maxSquareY = y;
          squareVal = square;
        }
      }
    }
  }
  console.log(grid[21][61]);
  return maxSquareX + ',' + maxSquareY + ',' + squareVal;
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
//test(18, '90,269,16');
//test(42, '232,251,12');
main();
console.timeEnd('A');

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
      if (x === 217 && 196 === y) {
        console.log('AA', grid[x][y], powerLevel);
      }
      // console.log(x, y, grid[x][y].powerLevel);
    }
  }

  let maxSquareValue = 0;
  let maxSquareX;
  let maxSquareY;
  for (let x = 0; x < 298; x++) {
    for (let y = 0; y < 298; y++) {
      const val = grid[x][y] + grid[x][y + 1] + grid[x][y + 2]
        + grid[x + 1][y] + grid[x + 1][y + 1] + grid[x + 1][y + 2]
        + grid[x + 2][y] + grid[x + 2][y + 1] + grid[x + 2][y + 2];
      if (val > maxSquareValue) {
        maxSquareValue = val;
        maxSquareX = x
        maxSquareY = y;
        console.log({ val, maxSquareY, maxSquareX });
      }
    }
  }
  console.log(grid[21][61]);
  return maxSquareX + ',' + maxSquareY;
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
test(18, '33,45');
test(42, '21,61');
main();
console.timeEnd('A');

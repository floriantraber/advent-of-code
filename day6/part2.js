const os = require('os');
const fs = require('fs');

const calculate = function (input) {
  const axes = input.map(str => {
    const split = str.split(', ');
    const x = +split[0];
    const y = +split[1];
    return { x, y };
  });
  const offset = 10000;
  const xLimit = axes.map(a => a.x).reduce((a, b) => a > b ? a : b) + 3 + offset;
  const yLimit = axes.map(a => a.y).reduce((a, b) => a > b ? a : b) + 3 + offset;

  let x = 0;
  let y = 0;
  let area = [];
  const locationsInRegion = new Set();
  let continueLoop = true;
  do {
    if (!area[x]) {
      area[x] = [];
    }
    area[x][y] = 0;
    for (let i = 0; i < axes.length; i++) {
      const manhattan = Math.abs(axes[i].x + offset - x) + Math.abs(axes[i].y + offset - y);
      area[x][y] += manhattan;
    }

    if (area[x][y] < 10000) {
      locationsInRegion.add({ x, y });
    }

    if (x < xLimit) {
      x++;
    } else if (x >= xLimit) {
      x = 0;
      y++;
    }

    if (y >= yLimit) {
      continueLoop = false;
    }

  } while (continueLoop) ;
  return locationsInRegion.size;
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
/*test(
  [
    '1, 1',
    '1, 6',
    '8, 3',
    '3, 4',
    '5, 5',
    '8, 9',
  ], 16);*/
main();
console.timeEnd('A');

const os = require('os');
const fs = require('fs');

const calculate = function (input) {
  const axes = input.map(str => {
    const split = str.split(', ');
    const x = +split[0];
    const y = +split[1];
    return { x, y };
  });
  const xLimit = axes.map(a => a.x).reduce((a, b) => a > b ? a : b) + 3;
  const yLimit = axes.map(a => a.y).reduce((a, b) => a > b ? a : b) + 3;

  let x = 0;
  let y = 0;
  let area = [];
  const areaSizes = [];
  const edgeAreas = new Set();
  let continueLoop = true;
  do {
    if (!area[x]) {
      area[x] = [];
    }

    let smallestManhattanIndex;
    let smallestManhattan = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < axes.length; i++) {
      const manhattan = Math.abs(axes[i].x - x) + Math.abs(axes[i].y - y);
      if (smallestManhattan > manhattan) {
        smallestManhattanIndex = i;
        smallestManhattan = manhattan;
      } else if (smallestManhattan === manhattan) {
        smallestManhattanIndex = undefined;
      }
    }

    area[x][y] = smallestManhattanIndex;
    if (smallestManhattanIndex) {
      if (!edgeAreas.has(smallestManhattanIndex)) {
        if (x === 0 || x >= xLimit || y === 0 || y >= yLimit) {
          edgeAreas.add(smallestManhattanIndex);
          areaSizes[smallestManhattanIndex] = undefined;
        } else {
          if (!areaSizes[smallestManhattanIndex]) {
            areaSizes[smallestManhattanIndex] = 0;
          }
          areaSizes[smallestManhattanIndex]++;
        }
      }
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

  return areaSizes.filter(x => x).reduce((a, b) => a > b ? a : b);
};


function main() {
  const inputFile = fs.readFileSync('input');
  const inputString = inputFile.toString();
  const inputArray = inputString.split(os.EOL);
  const result = calculate(inputArray);
  console.log('RESULT', result);
}

function part1(input, ex) {
  const result = calculate(input);
  if (result != ex && JSON.stringify(result) != JSON.stringify(ex)) {
    throw `expected ${ex} doesn't equals result: ${result}` + ' for input: ' + input;
  }
  console.log('test succeeded with input: ' + input + ', result: ' + result);
}

console.time('A');
part1(
  [
    '1, 1',
    '1, 6',
    '8, 3',
    '3, 4',
    '5, 5',
    '8, 9',
  ], 17);
main();
console.timeEnd('A');
// 3604


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function applyTransformations(currentState, transformations) {
    let result = currentState;
    transformations.forEach(transformation => {
        for (let i = 2; i < currentState.length - 2; i++) {
            if (currentState.substr(i - 2, 5) === transformation[0]) {
                result = utils_1.replaceAt(result, i, transformation[1]);
                // console.log('applying', result, i, workingState.substr(i - 2, 5), transformation);
            }
        }
    });
    return result;
}
function calculate(input) {
    const inputArr = input.split('\n');
    let currentState = inputArr[0].replace("initial state: ", "");
    const transformations = inputArr.slice(2, inputArr.length).map(x => x.split(" => "));
    console.log({ currentState, transformations });
    for (let i = 0; i < 1000; i++) {
        currentState = '..' + currentState + '..';
    }
    let prev = 0;
    for (let i = 0; i < 1000; i++) {
        let n = 0;
        currentState = applyTransformations(currentState, transformations);
        for (let a = 0; a < currentState.length; a++) {
            if (currentState[a] === '#') {
                n += a - 1000 * 2;
            }
        }
        console.log(i, n, n - prev);
        prev = n;
    }
    // 999 15697 15
    const result = (50000000000 - 998) * 15 + 15697;
    return result;
}
function main() {
    const inputString = "initial state: #....##.#.#.####..#.######..##.#.########..#...##...##...##.#.#...######.###....#...##..#.#....##.##\n" +
        "\n" +
        ".#.## => #\n" +
        ".#.#. => #\n" +
        "#.#.# => .\n" +
        ".#### => .\n" +
        ".#... => .\n" +
        "#..## => .\n" +
        "..#.# => #\n" +
        "#.#.. => .\n" +
        "##### => .\n" +
        "....# => .\n" +
        "...## => .\n" +
        "..##. => .\n" +
        "##.#. => #\n" +
        "##..# => .\n" +
        "##... => #\n" +
        "..### => #\n" +
        ".##.. => #\n" +
        "###.. => .\n" +
        "#..#. => .\n" +
        "##.## => .\n" +
        "..#.. => #\n" +
        ".##.# => #\n" +
        "####. => #\n" +
        "#.### => .\n" +
        "#...# => #\n" +
        "###.# => #\n" +
        "...#. => #\n" +
        ".###. => .\n" +
        ".#..# => #\n" +
        "..... => .\n" +
        "#.... => .\n" +
        "#.##. => #";
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
/*
test("initial state: #..#.#..##......###...###\n" +
    "\n" +
    "...## => #\n" +
    "..#.. => #\n" +
    ".#... => #\n" +
    ".#.#. => #\n" +
    ".#.## => #\n" +
    ".##.. => #\n" +
    ".#### => #\n" +
    "#.#.# => #\n" +
    "#.### => #\n" +
    "##.#. => #\n" +
    "##.## => #\n" +
    "###.. => #\n" +
    "###.# => #\n" +
    "####. => #", 325);
test("initial state: .................................#.................................\n" +
    "\n" +
    ".#... => #\n" +
    "...#. => #", 123);*/
main();
console.timeEnd('A');
//# sourceMappingURL=main.js.map
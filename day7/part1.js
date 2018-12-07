const os = require('os');
const fs = require('fs');

const calculate = function (input) {
    const stepInstructionsMap = new Map();
    input.forEach(x => {
        const mustFinish = x.substring(5, 6);
        const before = x.substring(36, 37);

        if (!stepInstructionsMap.has(before)) {
            stepInstructionsMap.set(before, {step: before, stepsThatMustFinishBefore: []});
        }
        if (!stepInstructionsMap.has(mustFinish)) {
            stepInstructionsMap.set(mustFinish, {step: mustFinish, stepsThatMustFinishBefore: []});
        }
        stepInstructionsMap.get(before).stepsThatMustFinishBefore.push(mustFinish);
    });
    let stepInstructions = [...stepInstructionsMap.values()];
    stepInstructions.sort((a, b) => a.step.localeCompare(b.step));
    const steps = [];
    do {
        const candidates = stepInstructions.filter(x => x.stepsThatMustFinishBefore.length === 0);
        if (candidates.length === 0) {
            throw new Error('No candidate found.');
        }
        steps.push(candidates[0].step);
        stepInstructions = stepInstructions.filter(x => x.step !== candidates[0].step);
        stepInstructions.forEach(x =>
            x.stepsThatMustFinishBefore = x.stepsThatMustFinishBefore.filter(y => y !== candidates[0].step));
    } while (stepInstructions.length > 0);
    return steps.reduce((a, b) => a + b);
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
test(
    [
        'Step C must be finished before step A can begin.',
        'Step C must be finished before step F can begin.',
        'Step A must be finished before step B can begin.',
        'Step A must be finished before step D can begin.',
        'Step B must be finished before step E can begin.',
        'Step D must be finished before step E can begin.',
        'Step F must be finished before step E can begin.'
    ], 'CABDFE');
main();
console.timeEnd('A');

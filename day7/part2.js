const os = require('os');
const fs = require('fs');

const calculate = function (input) {
    const abc = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    const noOfWorkers = 5;
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
    let second = 0;
    let workInProgressList = [];
    do {
        if (workInProgressList.length > 0) {
            workInProgressList.forEach(x => x.tick--);
        }
        const doneWorks = workInProgressList.filter(x => x.tick === 0);
        doneWorks.forEach(doneWork =>
            stepInstructions.forEach(x =>
                x.stepsThatMustFinishBefore = x.stepsThatMustFinishBefore.filter(y => y !== doneWork.step)));

        workInProgressList = workInProgressList.filter(x => x.tick > 0);

        while (workInProgressList.length < noOfWorkers) {
            const candidates = stepInstructions.filter(x => x.stepsThatMustFinishBefore.length === 0);
            if (candidates.length === 0) {
                break;
            }
            const step = candidates[0].step;
            const tick = 60 + abc.indexOf(step) + 1;
            stepInstructions = stepInstructions.filter(x => x.step !== candidates[0].step);
            workInProgressList.push({step, tick});
        }
        second++;
    } while (workInProgressList.length > 0);
    return --second;
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
        'Step C must be finished before step A can begin.',
        'Step C must be finished before step F can begin.',
        'Step A must be finished before step B can begin.',
        'Step A must be finished before step D can begin.',
        'Step B must be finished before step E can begin.',
        'Step D must be finished before step E can begin.',
        'Step F must be finished before step E can begin.'
    ], 15);*/
main();
console.timeEnd('A');

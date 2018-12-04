const os = require('os');
const fs = require('fs');

const calculate = function (guardLogEntries) {
  const guards = [];
  const guardSleepDurationMap = new Map();
  const parsedGuardLogEntries = guardLogEntries.map(guardLogEntry => {
    const year = +guardLogEntry.substring(1, 5);
    const month = +guardLogEntry.substring(6, 8);
    const day = +guardLogEntry.substring(9, 11);
    const hour = +guardLogEntry.substring(12, 14);
    const minute = +guardLogEntry.substring(15, 17);
    const action = guardLogEntry.substring(19);
    const date = new Date(year, month - 1, day, hour, minute, 0, 0);
    return { year, month, day, hour, minute, action, date };
  });

  parsedGuardLogEntries.sort((x, y) => x.date - y.date);

  let currGuardId;
  let asleepStartMinute;
  for (const guardLogEntry of parsedGuardLogEntries) {
    if (guardLogEntry.action.includes('begins shift')) {
      currGuardId = guardLogEntry.action.substring(7, guardLogEntry.action.indexOf(' begins'));
    } else if (guardLogEntry.action.includes('falls asleep')) {
      asleepStartMinute = guardLogEntry.minute;
    } else if (guardLogEntry.action.includes('wakes up')) {
      if (asleepStartMinute === undefined || currGuardId === undefined) {
        throw new Error('asleepStartMinute or currGuardId is not defined.');
      }
      const asleepEndMinute = guardLogEntry.minute;
      const sleepDuration = asleepEndMinute - asleepStartMinute;
      if (!guards[currGuardId]) {
        guards[currGuardId] = { sleepDuration: 0, sleepingEntries: [] };
      }
      guards[currGuardId].sleepDuration += sleepDuration;
      guards[currGuardId].sleepingEntries.push({ start: asleepStartMinute, end: asleepEndMinute });
      asleepStartMinute = undefined;
    }
  }
  const sleepingMinuteOccurrencesPerGuard = [];
  let maxSleepingOccurrences = 0;
  let maxSleepingOccurrencesMinute;
  let maxSleepingOccurrencesGuardId;
  guards.forEach((guard, id) => {
    guard.sleepingEntries.forEach(sleepingEntry => {
      for (let i = sleepingEntry.start; i < sleepingEntry.end; i++) {
        if (!sleepingMinuteOccurrencesPerGuard[id]) {
          sleepingMinuteOccurrencesPerGuard[id] = [];
        }
        if (!sleepingMinuteOccurrencesPerGuard[id][i]) {
          sleepingMinuteOccurrencesPerGuard[id][i] = 1;
        } else {
          sleepingMinuteOccurrencesPerGuard[id][i]++;
        }
        if (sleepingMinuteOccurrencesPerGuard[id][i] > maxSleepingOccurrences) {
          maxSleepingOccurrences = sleepingMinuteOccurrencesPerGuard[id][i];
          maxSleepingOccurrencesMinute = i;
          maxSleepingOccurrencesGuardId = id;
        }
      }
    });
  });
  return maxSleepingOccurrencesGuardId * maxSleepingOccurrencesMinute;

};


function main() {
  const inputFile = fs.readFileSync('input');
  const inputString = inputFile.toString();
  const inputArray = inputString.split(os.EOL);
  const result = calculate(inputArray);
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
part2([
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-05 00:55] wakes up',

], 4455);
main();
console.timeEnd('A');


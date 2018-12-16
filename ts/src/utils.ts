export function replaceAt(string: string, index: number, replacement: string) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}
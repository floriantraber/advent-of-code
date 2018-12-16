"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}
exports.replaceAt = replaceAt;
//# sourceMappingURL=utils.js.map
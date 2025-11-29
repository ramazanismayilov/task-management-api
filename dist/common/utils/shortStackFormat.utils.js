"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortStackFormat = void 0;
const winston = require("winston");
exports.shortStackFormat = winston.format((info) => {
    if (info.stack) {
        const stack = typeof info.stack === 'string' ? info.stack : info.stack?.toString?.() ?? '';
        const lines = stack.split('\n');
        const fileLine = lines.find((l) => l.includes('src\\') || l.includes('src/'));
        info.stack = fileLine?.trim() ?? lines[0]?.trim();
    }
    return info;
});
//# sourceMappingURL=shortStackFormat.utils.js.map
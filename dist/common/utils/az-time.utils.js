"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAZTime = getAZTime;
function getAZTime() {
    const now = new Date();
    const offset = 4 * 60;
    const local = new Date(now.getTime() + offset * 60 * 1000);
    const hours = String(local.getHours()).padStart(2, '0');
    const minutes = String(local.getMinutes()).padStart(2, '0');
    const seconds = String(local.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
//# sourceMappingURL=az-time.utils.js.map
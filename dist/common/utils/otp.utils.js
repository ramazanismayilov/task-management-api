"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpNumber = generateOtpNumber;
exports.generateOtpExpireDate = generateOtpExpireDate;
const crypto_1 = require("crypto");
function generateOtpNumber() {
    return (0, crypto_1.randomInt)(100000, 999999);
}
function generateOtpExpireDate(minutes = 10) {
    return new Date(Date.now() + minutes * 60 * 1000);
}
//# sourceMappingURL=otp.utils.js.map
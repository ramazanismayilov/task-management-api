import { randomInt } from 'crypto';

export function generateOtpNumber(): number {
    return randomInt(100000, 999999);
}

export function generateOtpExpireDate(minutes = 10): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
}

import * as winston from 'winston';

export const shortStackFormat = winston.format((info) => {
    if (info.stack) {
        const stack: string = typeof info.stack === 'string' ? info.stack : info.stack?.toString?.() ?? '';
        const lines = stack.split('\n');
        const fileLine = lines.find((l) => l.includes('src\\') || l.includes('src/'));
        info.stack = fileLine?.trim() ?? lines[0]?.trim();
    }
    return info;
});
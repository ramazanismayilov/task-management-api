"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const Utils = require("../../common/utils");
exports.winstonConfig = {
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp(), Utils.shortStackFormat(), winston.format.json()),
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'logs/app.log',
            level: 'debug',
        }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike('TaskMaster')),
        }),
    ],
};
//# sourceMappingURL=logger.config.js.map
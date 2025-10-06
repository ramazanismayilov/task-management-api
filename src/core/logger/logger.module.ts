import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getAZTime } from '../../common/utils/az-time.utils';
import * as winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        winston.format.colorize(),
                        winston.format.json(),
                        winston.format.printf(({ level, message, timestamp }) => {
                            return `${timestamp} [${level}]: ${message}`;
                        }),
                    ),
                }),
                new winston.transports.File({
                    filename: 'logs/application.log',
                    format: winston.format.combine(
                        winston.format.printf(({ level, message }) => {
                            return `${getAZTime()} [${level}]: ${message}`;
                        }),
                    ),
                })
            ],
        }),
    ],
    exports: [WinstonModule],
})
export class LoggerModule { }

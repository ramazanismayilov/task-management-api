import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        winston.format.json(),
                        winston.format.printf(({ level, message, timestamp }) => {
                            return `${timestamp} [${level}]: ${message}`;
                        }),
                    ),
                }),
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            ],
        }),
    ],
    exports: [WinstonModule],
})
export class LoggerModule { }

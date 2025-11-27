import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger.config';
import { HttpExceptionFilter } from '../filters/http-exceptions.filter';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessLoggingInterceptor } from '../../common/interceptors/success-logging.interceptor';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [HttpExceptionFilter,
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessLoggingInterceptor,
    },
  ]
})
export class LoggerModule { }

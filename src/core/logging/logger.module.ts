import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger.config';
import { AppLoggerService } from './logger.service';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class LoggerModule {}

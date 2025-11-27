import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as Utils from '../../common/utils';

export const winstonConfig: winston.LoggerOptions = {
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    Utils.shortStackFormat(),
    winston.format.json(),
  ),
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
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('TaskMaster'),
      ),
    }),
  ],
};

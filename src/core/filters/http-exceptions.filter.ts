import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    ) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Something went wrong';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse() as any;

            if (typeof res === 'string') {
                message = res;
            } else if (Array.isArray(res.message)) {
                message = res.message.join(', ');
            } else if (res?.message) {
                message = res.message;
            } else {
                message = exception.message;
            }
        }
        this.logger.error(message, exception instanceof Error ? exception.stack : '')

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
        });
    }
}

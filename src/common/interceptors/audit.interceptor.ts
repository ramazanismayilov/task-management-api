import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { AuditService } from "src/core/audit/audit.service";

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, user, body } = req;

    const unauthenticatedEndpoints = {
      '/api/auth/login': true,
      '/api/auth/register': true,
      '/api/auth/verifyOtp': true,
      '/api/auth/resendOtp': true,
      '/api/auth/refreshToken': true,
      '/api/auth/forget-password': true,
      '/api/auth/forget-password/confirm': true,
    };

    const isMutating = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);

    return next.handle().pipe(
      tap(async (response) => {

        if (unauthenticatedEndpoints[url]) {
          await this.auditService.record({
            userId: response?.data?.userId ?? null,
            method,
            url,
            status: response?.statusCode ?? 200,
            meta: { body, response },
          });
          return;
        }

        if (isMutating) {
          await this.auditService.record({
            userId: user?.id ?? null,
            method,
            url,
            status: response.statusCode,
            meta: { body, response },
          });
        }
      })
    );
  }
}

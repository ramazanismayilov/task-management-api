import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map, mergeMap, tap } from 'rxjs';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, user, body } = req;
    const isMutating = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method);

    return next.handle().pipe(
      tap((response) => {
        if (isMutating && user) {
          void this.auditService.record(
            `${method} ${url}`,
            user.id,
            user.organizationId,
            { body, response },
          );
        }
      })

    );
  }
}

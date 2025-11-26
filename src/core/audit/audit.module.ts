import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { AuditInterceptor } from './audit.interceptor';
import { AuditEntity } from './entities/audit.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [
    AuditService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  exports: [AuditService],
})
export class AuditModule { }

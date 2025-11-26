import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEntity } from './entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepo: Repository<AuditEntity>,
  ) { }

  async record(action: string, userId: string, organizationId: string, metadata: any = {}) {
    const audit = this.auditRepo.create({
      action,
      userId,
      organizationId,
      metadata,
    });
    await this.auditRepo.save(audit);
  }
}

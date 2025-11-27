import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEntity } from './entities/audit.entity';
import { CreateAuditDto } from './dto/audit.dto';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepo: Repository<AuditEntity>,
  ) { }

  async record(dto: CreateAuditDto) {
    const audit = this.auditRepo.create(dto);
    await this.auditRepo.save(audit);
  }

}

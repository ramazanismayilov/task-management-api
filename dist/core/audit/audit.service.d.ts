import { Repository } from 'typeorm';
import { AuditEntity } from './entities/audit.entity';
import { CreateAuditDto } from './dto/audit.dto';
export declare class AuditService {
    private readonly auditRepo;
    constructor(auditRepo: Repository<AuditEntity>);
    record(dto: CreateAuditDto): Promise<void>;
}

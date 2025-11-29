import { LoggerService } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class RoleSeeder {
    private readonly logger;
    constructor(logger: LoggerService);
    run(dataSource: DataSource): Promise<void>;
}

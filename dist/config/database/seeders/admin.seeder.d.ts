import { DataSource } from 'typeorm';
import { LoggerService } from '@nestjs/common';
export declare class AdminSeeder {
    private readonly logger;
    constructor(logger: LoggerService);
    run(dataSource: DataSource): Promise<void>;
}

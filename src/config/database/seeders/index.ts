import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { AdminSeeder } from './admin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  const dataSource = app.get(DataSource);

  try {
    await new RoleSeeder(logger).run(dataSource);
    await new AdminSeeder(logger).run(dataSource);

    logger.log('Seeding finished successfully', 'SeederBootstrap');
  } catch (error) {
    logger.error('Seeding error', error.stack, 'SeederBootstrap');
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

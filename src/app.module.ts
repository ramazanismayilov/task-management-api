import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClsModule } from './core/cls/cls.module';
import { MailerModule } from './config/mailer/mailer.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './core/logging/logger.module';
import { AuditModule } from './core/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MailerModule,
    ClsModule,
    LoggerModule,
    AuditModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

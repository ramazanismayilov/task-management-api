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
import { LoggerModule } from './core/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    DatabaseModule,
    AuthModule,
    MailerModule,
    ClsModule,
    LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

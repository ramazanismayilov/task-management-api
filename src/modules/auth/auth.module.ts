import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module'; 
import { RoleEntity } from '../roles/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RoleEntity]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    if (configService.get('NODE_ENV') === 'production') {
        return {
            type: 'mysql',
            host: configService.get('MYSQL_HOST'),
            port: configService.get<number>('MYSQL_PORT'),
            username: configService.get('MYSQL_USER'),
            password: configService.get('MYSQL_PASSWORD'),
            database: configService.get('MYSQL_DB'),
            entities: [join(__dirname, '../**/*.entity.{ts,js}')],
            migrations: [join(__dirname, '../migrations/*.{ts,js}')],
            synchronize: false,
            logging: true,
        };
    }

    return {
        type: 'postgres',
        host: configService.get('SUPABASE_HOST'),
        port: configService.get<number>('SUPABASE_PORT'),
        username: configService.get('SUPABASE_USER'),
        password: configService.get('SUPABASE_PASSWORD'),
        database: configService.get('SUPABASE_DB'),
        entities: [join(__dirname, '../**/*.entity.{ts,js}')],
        migrations: [join(__dirname, '../migrations/*.{ts,js}')],
        synchronize: true,
        logging: true,
    };
};

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig = (): TypeOrmModuleOptions => {
    if (process.env.NODE_ENV === 'production') {
        return {
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT) || 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            entities: [join(__dirname, '../**/*.entity.{ts,js}')],
            migrations: [join(__dirname, '../migrations/*.{ts,js}')],
            synchronize: false,
            logging: true,
        };
    }

    return {
        type: 'postgres',
        host: process.env.SUPABASE_HOST,
        port: Number(process.env.SUPABASE_PORT) || 5432,
        username: process.env.SUPABASE_USER,
        password: process.env.SUPABASE_PASSWORD,
        database: process.env.SUPABASE_DB,
        entities: [join(__dirname, '../**/*.entity.{ts,js}')],
        migrations: [join(__dirname, '../migrations/*.{ts,js}')],
        synchronize: true,
        logging: true,
    };
};

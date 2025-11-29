"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../../app.module");
const typeorm_1 = require("typeorm");
const nest_winston_1 = require("nest-winston");
const role_seeder_1 = require("./role.seeder");
const admin_seeder_1 = require("./admin.seeder");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const logger = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);
    const dataSource = app.get(typeorm_1.DataSource);
    try {
        await new role_seeder_1.RoleSeeder(logger).run(dataSource);
        await new admin_seeder_1.AdminSeeder(logger).run(dataSource);
        logger.log('Seeding finished successfully', 'SeederBootstrap');
    }
    catch (error) {
        logger.error('Seeding error', error.stack, 'SeederBootstrap');
        process.exit(1);
    }
    finally {
        await app.close();
        process.exit(0);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map
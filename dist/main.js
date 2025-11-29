"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_config_1 = require("./config/swagger/swagger.config");
const http_exceptions_filter_1 = require("./core/filters/http-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
    });
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalFilters(app.get(http_exceptions_filter_1.HttpExceptionFilter));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    (0, swagger_config_1.setupSwagger)(app);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
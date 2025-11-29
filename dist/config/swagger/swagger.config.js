"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const setupSwagger = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('TaskMaster')
        .setDescription('The TaskMaster API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
        customJs: [
            'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
            'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
        ],
        customfavIcon: 'https://unpkg.com/swagger-ui-dist/favicon-32x32.png'
    });
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map
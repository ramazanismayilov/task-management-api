import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('TaskMaster')
        .setDescription('The TaskMaster API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory, {
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
}
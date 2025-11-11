import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('TaskMaster')
        .setDescription('The TaskMaster API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document, {
        swaggerOptions: { persistAuthorization: true },
    })
}
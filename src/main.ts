import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SerializeInterceptor } from '@common/interceptors/serialize.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle('Api').setDescription('Api').setVersion('1.0').build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);

    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new SerializeInterceptor(new Reflector()));

    await app.listen(3000);
}

bootstrap();

import {NestFactory} from '@nestjs/core';
import {AppModule} from './parts/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(5647)
}

bootstrap()
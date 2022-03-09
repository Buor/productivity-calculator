import {NestFactory} from '@nestjs/core';
import {AppModule} from './parts/app/app.module';
import * as fs from "fs";
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.setGlobalPrefix('/api')

    checkFolders()

    await app.listen(5647)
}

function checkFolders() {
    if(!fs.existsSync('./saves') || !fs.existsSync('./saves/days'))
        fs.mkdirSync('./saves/days',{recursive: true})

}

bootstrap()
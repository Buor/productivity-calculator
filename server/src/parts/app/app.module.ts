import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {appImports} from "../../utils/appImports/appImports";

@Module({
    imports: appImports,
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

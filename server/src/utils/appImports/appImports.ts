import {TypeOrmModule} from "@nestjs/typeorm";
import {CalendarModule} from "../../parts/calendar/calendar.module";

const configModules = [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './saves/saveFile.db',
    entities: ["dist/entities/**/*.js"],
    synchronize: true, //todo remove on production
})]

const modules = [CalendarModule]

export const appImports = [
    ...configModules,
    ...modules
]
import {Module} from "@nestjs/common";
import {CalendarService} from "./calendar.service";
import {CalendarController} from "./calendar.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DateE} from "../../entities/DateE";
import {DateResult} from "../../entities/DateResult";
import {Action} from "../../entities/Action";
import {ActionType} from "../../entities/ActionType";

@Module({
    controllers: [CalendarController],
    providers: [CalendarService],
    imports: [TypeOrmModule.forFeature([DateE, DateResult, Action, ActionType])]
})
export class CalendarModule {
}
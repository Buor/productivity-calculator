import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DateE} from "../../entities/DateE";
import {Repository} from "typeorm";
import {DateResult} from "../../entities/DateResult";
import {ActionType} from "../../entities/ActionType";
import {Action} from "../../entities/Action";
import {analyzeTime} from "../../core/timeAnalyzer";
import {IAnalyzeResult} from "../../../commonTypes/timeAnalyzerTypes";

@Injectable()
export class CalendarService {
    constructor(@InjectRepository(DateE) private dateRepository: Repository<DateE>,
                @InjectRepository(DateResult) private dateResultRepository: Repository<DateResult>,
                @InjectRepository(Action) private actionRepository: Repository<Action>,
                @InjectRepository(ActionType) private actionTypeRepository: Repository<ActionType>
    ) {
    }

    async addDay(actionsText: string): Promise<IAnalyzeResult | never> {
        try {
            const dayResult = analyzeTime(actionsText)
            return this.addDayToDb(dayResult)
        } catch (e) {
            throw new HttpException({
                message: e.message,
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async addDays(actionsText: string): Promise<true | never> {
        const actionsSplitByDates = actionsText.split(/-{4,}/)

        if (actionsSplitByDates.length < 2) throw new HttpException({
            message: `Please, separate days with 4 or more '-' signs!`,
        }, HttpStatus.BAD_REQUEST)

        try {
            const daysActions = actionsSplitByDates.map(dayActions => analyzeTime(dayActions))
            for(let dayActions of daysActions)
                await this.addDayToDb(dayActions)

            return true
        } catch (e) {
            throw new HttpException({
                message: e.message,
            }, HttpStatus.BAD_REQUEST)
        }
    }

    private async addDayToDb(dayResult: IAnalyzeResult) {
        //Deal with dateResult
        let dateResult = this.dateResultRepository.create()
        dateResult.positiveActionsPercentage = dayResult.actionsPercentages.positive.percentage
        dateResult.neutralActionsPercentage = dayResult.actionsPercentages.neutral.percentage
        dateResult.negativeActionsPercentage = dayResult.actionsPercentages.negative.percentage
        dateResult.positiveActionsTime = dayResult.actionsPercentages.positive.actionsTime
        dateResult.neutralActionsTime = dayResult.actionsPercentages.neutral.actionsTime
        dateResult.negativeActionsTime = dayResult.actionsPercentages.negative.actionsTime
        dateResult.productivity = dayResult.productivity.value

        await this.dateResultRepository.save(dateResult)

        //Deal with date
        let date = this.dateRepository.create()
        date.date = dayResult.date
        date.dateResult = dateResult

        await this.dateRepository.save(date)

        //Deal with actions
        for (let action of dayResult.actions) {
            let dbAction = this.actionRepository.create()
            dbAction.date = date
            dbAction.startTime = action.startTime
            dbAction.endTime = action.endTime
            dbAction.name = action.name
            dbAction.duration = action.durationMs
            dbAction.description = action.description
            dbAction.nature = action.nature

            await this.actionRepository.save(dbAction)
        }
        return dayResult
    }
}
import {IDateResult} from "./timeAnalyzerTypes";

export interface IMonthDTO {
    datesData: IDateData[]
}

export interface IDateData {
    dateResult: IDateResult | null
    dateISO: string
}
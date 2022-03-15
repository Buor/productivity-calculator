import {IAnalyzeResult} from "./timeAnalyzerTypes";

export interface IDayDTO {
    date: Date
    dayData: IAnalyzeResult | null
    error?: Error
}
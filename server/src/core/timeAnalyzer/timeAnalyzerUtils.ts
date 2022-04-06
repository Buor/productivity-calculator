import {IAnalyzeResult, IDateResult} from "../../../commonTypes/timeAnalyzerTypes";
import {Advices} from "../../utils/advices/advices";

export function analyzeResultToDateResult({advicesLinks, ...rest}: IAnalyzeResult): IDateResult {
    return {...rest, advices: advicesLinks.map(adviceLink => Advices[adviceLink])}
}
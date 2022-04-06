import {convertMs} from "../../../client/src/core/utils/timeUtils";
import {IAction, IActionPercentages} from "../../../commonTypes/timeAnalyzerTypes";

export function dealWithSport(actions: IAction[]): [number, string] {
    /* Sport productivity impact
        1 hour per day = +15
        +3 for every additional 15 minutes
    */
    let productivityValueMagnifier = 0

    const sportDurationM = actions.reduce((acc, action) => action.type === 'sport' ? acc + +convertMs(action.durationMs, 'm') : acc, 0)
    if (sportDurationM >= 60) productivityValueMagnifier += 15 + Math.round((sportDurationM - 60) / 15) * 3

    let advice: string

    //Form advice
    if (sportDurationM >= 180)
        advice = 'sport5'
    else if (sportDurationM >= 120)
        advice = 'sport4'
    else if (sportDurationM >= 60)
        advice = 'sport3'
    else if (sportDurationM >= 30)
        advice = 'sport2'
    else if (sportDurationM >= 0)
        advice = 'sport1'

    else throw new Error(`Can't generate sport Advice!`)

    return [productivityValueMagnifier, advice]
}

export function dealWithActions(actions: IAction[], actionsPercentages: IActionPercentages): [number, string] {
    /* Positive actions impact
        6 minutes of any positive action = +1
        For every hour +5 in addition
    */
    let productivityValueMagnifier = 0

    const positiveActionsDurationM = actions.reduce((acc, action) => action.nature === 'positive' ? acc + +convertMs(action.durationMs, 'm') : acc, 0)
    productivityValueMagnifier += Math.floor(positiveActionsDurationM / 6) + Math.floor(positiveActionsDurationM / 60) * 5


    //Make link to advice
    let actionsAdvice: string

    let positiveActionsPercentage = actionsPercentages.positive
    let negativeActionsPercentage = actionsPercentages.negative
    if (positiveActionsPercentage === undefined || negativeActionsPercentage === undefined) throw new Error(`Error! Can't find positive or negative actions!`)

    let [positiveActionsDurationMs, negativeActionsDurationMs] = [positiveActionsPercentage.actionsTime, negativeActionsPercentage.actionsTime]

    if (positiveActionsDurationMs / negativeActionsDurationMs >= 4)
        actionsAdvice = 'actions5'
    else if (positiveActionsDurationMs / negativeActionsDurationMs >= 2)
        actionsAdvice = 'actions4'
    else if (negativeActionsDurationMs / positiveActionsDurationMs > 4)
        actionsAdvice = 'actions1'
    else if (negativeActionsDurationMs / positiveActionsDurationMs > 2)
        actionsAdvice = 'actions2'
    else
        actionsAdvice = 'actions3'

    return [productivityValueMagnifier, actionsAdvice]
}

export function dealWithSleep(actions: IAction[]): [number, string] {
    /* Bedtime impact
        < 22:00 = +20
        22:00 - 23:00 = +15
        23:00 - 00:00 = +10
    */
    let productivityValueMagnifier = 0

    const bedtimeHour = actions.slice(-1)[0].endTime.getHours()

    if (bedtimeHour <= 22) productivityValueMagnifier += 20
    else if (bedtimeHour === 23) productivityValueMagnifier += 15
    else if (bedtimeHour === 0) productivityValueMagnifier += 10

    let advice: string
    //Form advice
    if (bedtimeHour <= 23)
        advice = 'sleep1'
    else
        advice = 'sleep2'

    return [productivityValueMagnifier, advice]
}

export function dealWithFood(actions: IAction[]): [number, string] {
    let productivityValueMagnifier = 0

    let junkFoodRegExp = /#(вреднаяЕда|junkFood)=([1-9]\d*)/

    actions.forEach(action => {
        const matched = action.description.match(junkFoodRegExp)
        if (matched !== null) {
            const junkFoodCount = +matched[2]
            productivityValueMagnifier += junkFoodCount * -5

            action.description = action.description.replace(matched[0], '')
        }
    })

    let advice: string

    if (productivityValueMagnifier === 0)
        advice = 'food3'
    else if (productivityValueMagnifier <= 15)
        advice = 'food2'
    else
        advice = 'food1'


    return [productivityValueMagnifier, advice]
}
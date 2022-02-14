import {convertMs} from "./utils/timeUtils";
import {IAction, IActionPercentage, IAdvice} from "./timeAnalyzer";

export function dealWithSport(actions: IAction[]): [number, IAdvice] {
    /* Sport productivity impact
        1 hour per day = +15
        +3 for every additional 15 minutes
    */
    let productivityValueMagnifier = 0

    const sportDurationM = actions.reduce((acc, action) => action.type === 'sport' ? acc + +convertMs(action.durationMs, 'm') : acc, 0)
    if (sportDurationM >= 60) productivityValueMagnifier += 15 + Math.round((sportDurationM - 60) / 15) * 3

    let advice: IAdvice

    //Form advice
    if (sportDurationM >= 180)
        advice = {
            mark: 'positive',
            text: `You have no equal! Wonderful work on the body and on yourself! Just don't overdo it with strength exercises, and you should also have a good rest.`
        }
    else if (sportDurationM >= 120)
        advice = {
            mark: 'positive',
            text: 'Great job! Your body will thank you, the risk of many diseases is reduced. But don\'t overdo it!'
        }
    else if (sportDurationM >= 60)
        advice = {
            text: 'A healthy body has a healthy mind. Good job.',
            mark: 'positive'
        }
    else if (sportDurationM >= 30)
        advice = {
            text: 'Not a bad job on the body, but you can clearly do better!',
            mark: 'neutral'
        }
    else if (sportDurationM >= 0)
        advice = {
            text: 'Don\'t ignore health and sport! This is one of the most important things in life, and it needs to be monitored so that every next day is better for you!',
            mark: 'negative'
        }
    else throw new Error(`Can't generate sport Advice!`)

    return [productivityValueMagnifier, advice]
}

export function dealWithActions(actions: IAction[], actionsPercentages: IActionPercentage[]): [number, IAdvice] {
    /* Positive actions impact
        6 minutes of any positive action = +1
        For every hour +5 in addition
    */
    let productivityValueMagnifier = 0

    const positiveActionsDurationM = actions.reduce((acc, action) => action.nature === 'positive' ? acc + +convertMs(action.durationMs, 'm') : acc, 0)
    productivityValueMagnifier += Math.floor(positiveActionsDurationM / 6) + Math.floor(positiveActionsDurationM / 60) * 5


    //Form advice
    let actionsAdvice: IAdvice = {text: '', mark: 'neutral'}

    let positiveActionsPercentage = actionsPercentages.find(ap => ap.name === 'Positive actions')
    let negativeActionsPercentage = actionsPercentages.find(ap => ap.name === 'Negative actions')
    if (positiveActionsPercentage === undefined || negativeActionsPercentage === undefined) throw new Error(`Error! Can't find positive or negative actions!`)

    let [positiveActionsDurationMs, negativeActionsDurationMs] = [positiveActionsPercentage.actionsTime, negativeActionsPercentage.actionsTime]

    if (positiveActionsDurationMs / negativeActionsDurationMs >= 4) {
        actionsAdvice.text = 'Positive actions exceed negative ones by 4 times or even more. You did a great job! Keep it up!'
        actionsAdvice.mark = 'positive'
    } else if (positiveActionsDurationMs / negativeActionsDurationMs >= 2) {
        actionsAdvice.text = 'Positive actions exceed negative ones by 2 times. You did a good job!'
        actionsAdvice.mark = 'positive'
    } else if (negativeActionsDurationMs / positiveActionsDurationMs > 4) {
        actionsAdvice.text = 'Negative actions exceed positive ones by 4 times. Don\'t let your hands go down! Remember that your actions today determine how all your future days will pass. Don\'t lose heart and go ahead!'
        actionsAdvice.mark = 'negative'
    } else if (negativeActionsDurationMs / positiveActionsDurationMs > 2) {
        actionsAdvice.text = 'Negative actions exceed positive ones by 2 times. Do not lose faith in yourself and do not forget what you are trying for!'
        actionsAdvice.mark = 'negative'
    } else {
        actionsAdvice.text = 'Positive actions are approximately equal to negative ones in duration. You can do better!'
        actionsAdvice.mark = 'neutral'
    }
    return [productivityValueMagnifier, actionsAdvice]
}

export function dealWithSleep(actions: IAction[]): [number, IAdvice] {
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

    let advice: IAdvice
    //Form advice
    if (bedtimeHour <= 23)
        advice = {
            text: `You went to bed on time! Good job!`,
            mark: 'positive'
        }
    else
        advice = {
            text: `Napping is essential for healthy life. Try to go to sleep before 23:00 or even earlier!`,
            mark: `neutral`
        }
    return [productivityValueMagnifier, advice]
}
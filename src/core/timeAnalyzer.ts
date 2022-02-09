import {calculateDurationMs, convertMs} from './utils/timeUtils';

export interface IAction {
    name: string
    startTime: Date
    endTime: Date
    nature: TNature
    type: TAction
    durationMs: number
    description: string
}

export interface IActionPercentage {
    name: string,
    percentage: number,
    color?: string
    actionsTime: number
}

export interface IAdvice {
    text: string
    mark: 'positive' | 'neutral' | 'negative'
}

type TNature = 'positive' | 'neutral' | 'negative'
type TAction = 'sport' | 'default' | 'food' | 'sleep'
const actionTypes = ['sport', 'default', 'food', 'sleep']

function parseActions(actionsString: string): IAction[] {
    const stringActions = actionsString.split('\n')
    const actions: IAction[] = []

    for (let stringAction of stringActions) {
        if (stringAction === '') continue

        const previousAction = actions.length && actions.slice(-1)[0]

        //Check if string is an action description
        if (!/^[\d\-]/.test(stringAction)) {
            previousAction && (previousAction.description += stringAction)
            continue
        }

        const actionRegExp = Array.from(stringAction.matchAll(/((?<startTimeHours>[012]?\d):(?<startTimeMinutes>[0-5]\d))?-(?<endTimeHours>[012]?\d):(?<endTimeMinutes>[0-5]\d)\)\s*(?<name>[^#.]+)\s*#?(?<nature>[PNnПНн])?(\.(?<type>\w+))?/g))[0]

        validateActionString(stringAction, actionRegExp)

        //form actionObject
        const name = actionRegExp!.groups!.name
        let startTime = new Date(0, 0, 0, +actionRegExp!.groups!.startTimeHours, +actionRegExp!.groups!.startTimeMinutes)

        if (Number.isNaN(startTime.valueOf())) {
            if (previousAction !== 0)
                startTime = previousAction.endTime
            else throw new Error(`Error! Start time of action "${name}" is not defined!`)
        }

        const endTime = new Date(0, 0, 0, +actionRegExp!.groups!.endTimeHours, +actionRegExp!.groups!.endTimeMinutes)
        const type = actionRegExp!.groups!.type as TAction

        //check time validity
        const timeValidity = checkTimeValidity(stringAction, startTime, endTime)
        if (timeValidity !== 'ok') throw new Error(timeValidity)

        //define nature of action
        const natureLetter = actionRegExp!.groups!.nature
        const nature = natureLetterToNature(natureLetter)

        //calculate action duration

        const durationMs = calculateDurationMs(startTime, endTime)

        const action: IAction = {name, startTime, endTime, nature, description: '', type: type || 'default', durationMs}
        actions.push(action)
    }

    if (actions.length === 0) throw new Error('Error! No actions found!')

    return actions

    function checkTimeValidity(stringAction: string, startTime: Date, endTime: Date): string {
        if (actions.length) {
            const lastAction = actions.slice(-1)[0]
            if (lastAction.endTime > startTime) return `Error! Action ${lastAction.name} ends after the start of ${stringAction}!`
        }
        if (endTime <= startTime) return `Error! Action "${stringAction}" end time must be higher than start time!`
        return 'ok'
    }

    function validateActionString(initialString: string, actionRegExp: RegExpMatchArray | null) {
        if (!actionRegExp || !actionRegExp.groups) throw new Error(`Error! Action "${initialString}" has bad formatting!`)
        if (!actionRegExp.groups.name) throw new Error(`Error! Action "${initialString}" has no name!`)
        if (!actionRegExp.groups.endTimeHours || !actionRegExp.groups.endTimeMinutes) throw new Error(`Error! Action "${initialString}" has no end time!`)
        if (actionRegExp.groups.type && !actionTypes.includes(actionRegExp.groups.type)) throw new Error(`Error! Action type "${actionRegExp.groups.type}" doesn't exist!`)
    }

    function natureLetterToNature(natureLetter: string): TNature {
        switch (natureLetter) {
            case 'P':
            case 'П':
                return 'positive'
            case 'N':
            case 'Н':
                return 'negative'
            case 'n':
            case 'н':
            default:
                return 'neutral'
        }
    }
}

function calculateActionsPercentage(actions: IAction[]): IActionPercentage[] {
    const startDayTime = actions[0].startTime
    const endDayTime = actions.slice(-1)[0].endTime

    const wholeDayTime = endDayTime.valueOf() - startDayTime!.valueOf()

    let positiveActionsTime = actions.reduce((acc, action) => action.nature === 'positive' ? acc + calculateDurationMs(action.startTime, action.endTime) : acc, 0)
    let positiveActionsPercentage = +(positiveActionsTime / wholeDayTime * 100).toFixed(2)

    let negativeActionsTime = actions.reduce((acc, action) => action.nature === 'negative' ? acc + calculateDurationMs(action.startTime, action.endTime) : acc, 0)
    let negativeActionsPercentage = +(negativeActionsTime / wholeDayTime * 100).toFixed(2)

    // let neutralActionsTime = actions.reduce((acc, action) => action.nature === 'positive' ? acc + getActionDuration(action) : acc, 0)
    let neutralActionsTime = wholeDayTime - positiveActionsTime - negativeActionsTime
    let neutralActionsPercentage = +(neutralActionsTime / wholeDayTime * 100).toFixed(2)

    // WARNING! Name changing will break the program!
    return [
        {
            name: 'Positive actions',
            percentage: positiveActionsPercentage,
            actionsTime: positiveActionsTime,
            color: 'green.500'
        },
        {
            name: 'Neutral actions',
            percentage: neutralActionsPercentage,
            actionsTime: neutralActionsTime,
            color: 'yellow.500'
        },
        {
            name: 'Negative actions',
            percentage: negativeActionsPercentage,
            actionsTime: negativeActionsTime,
            color: 'red.500'
        }
    ]
}

function getProductivityAndAdvices(actions: IAction[], actionsPercentages: IActionPercentage[]): [number, IAdvice[]] {
    let productivityValue = 0

    /* Consider Sport
        1 hour per day = +15
        +3 for every additional 15 minutes
    */
    const sportDurationM = actions.reduce((acc, action) => action.type === 'sport' ? acc + +convertMs(action.durationMs, 'm') : acc, 0)
    if (sportDurationM >= 60) productivityValue += 15 + Math.round((sportDurationM - 60) / 15) * 3

    /* Consider Positive actions
        6 minutes of any positive action = +1
        For every hour +5 in addition
    */
    const positiveActionsDurationM = actions.reduce((acc, action) => action.nature === 'positive' ? acc + +convertMs(action.durationMs, 'm') : acc, 0)
    productivityValue += Math.floor(positiveActionsDurationM / 6) + Math.floor(positiveActionsDurationM / 60) * 5

    /* Consider Bedtime
        < 22:00 = +20
        22:00 - 23:00 = +15
        23:00 - 00:00 = +10
    */
    const bedtimeHour = actions.slice(-1)[0].endTime.getHours()

    if (bedtimeHour <= 22) productivityValue += 20
    else if (bedtimeHour === 23) productivityValue += 15
    else if (bedtimeHour === 0) productivityValue += 10

    return [productivityValue, [getSportAdvice(), getActionsAdvice(), getSleepAdvice()]]

    function getSportAdvice() {
        let sportAdvice: IAdvice

        if (sportDurationM >= 180)
            sportAdvice = {
                mark: 'positive',
                text: `You have no equal! Wonderful work on the body and on yourself! Just don't overdo it with strength exercises, and you should also have a good rest.`
            }
        else if (sportDurationM >= 120)
            sportAdvice = {
                mark: 'positive',
                text: 'Great job! Your body will thank you, the risk of many diseases is reduced. But don\'t overdo it!'
            }
        else if (sportDurationM >= 60)
            sportAdvice = {
                text: 'A healthy body has a healthy mind. Good job.',
                mark: 'positive'
            }
        else if (sportDurationM >= 30)
            sportAdvice = {
                text: 'Not a bad job on the body, but you can clearly do better!',
                mark: 'neutral'
            }
        else if (sportDurationM >= 0)
            sportAdvice = {
                text: 'Don\'t ignore health and sport! This is one of the most important things in life, and it needs to be monitored so that every next day is better for you!',
                mark: 'negative'
            }
        else throw new Error(`Can't generate sport Advice!`)

        return sportAdvice
    }

    function getActionsAdvice() {
        let actionsAdvice: IAdvice = {text: '', mark: 'neutral'}

        let positiveActionsPercentage = actionsPercentages.find(ap => ap.name === 'Positive actions')
        let negativeActionsPercentage = actionsPercentages.find(ap => ap.name === 'Negative actions')
        if (!positiveActionsPercentage || !negativeActionsPercentage) throw new Error(`Error! Can't find positive or negative actions!`)

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
        return actionsAdvice
    }

    function getSleepAdvice() {
        let sleepAdvice: IAdvice

        if (bedtimeHour <= 23)
            sleepAdvice = {
                text: `You went to bed on time! Good job!`,
                mark: 'positive'
            }
        else
            sleepAdvice = {
                text: `Napping is essential for healthy life. Try to go to sleep before 23:00 or even earlier!`,
                mark: `neutral`
            }

        return sleepAdvice
    }
}

export interface IAnalyzeResult {
    actionsPercentages: IActionPercentage[]
    productivity: number,
    actions: IAction[],
    advices: IAdvice[]
}

export function analyzeTime(actionsString: string): IAnalyzeResult {

    const actions = parseActions(actionsString)
    const actionsPercentages = calculateActionsPercentage(actions)
    const [productivity, advices] = getProductivityAndAdvices(actions, actionsPercentages)

    return {
        actions,
        actionsPercentages,
        productivity,
        advices
    }
}
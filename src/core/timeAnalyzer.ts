interface IAction {
    name: string
    startTime?: Date
    endTime: Date
    nature: TNature
    type: TAction
    description: string
}

export interface IActionsPercentage {
    positiveActionsTime: number
    negativeActionsTime: number
    neutralActionsTime: number
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
        // const actionRegExp = Array.from(stringAction.matchAll(/((?<startTimeHours>[012]?\d):(?<startTimeMinutes>[0-5]\d))?-(?<endTimeHours>[012]?\d):(?<endTimeMinutes>[0-5]\d)\)\s*(?<name>[^#.]+)\s#?(?<nature>[PNnПНн])?(\.(?<type>\w+))?/g))[0]

        validateActionString(stringAction, actionRegExp)

        //form actionObject
        const name = actionRegExp!.groups!.name
        const startTime = new Date(0, 0, 0, +actionRegExp!.groups!.startTimeHours, +actionRegExp!.groups!.startTimeMinutes)
        const endTime = new Date(0, 0, 0, +actionRegExp!.groups!.endTimeHours, +actionRegExp!.groups!.endTimeMinutes)
        const type = actionRegExp!.groups!.type as TAction

        //check time validity
        const timeValidity = checkTimeValidity(stringAction, startTime, endTime)
        if (timeValidity !== 'ok') throw new Error(timeValidity)

        //define nature of action
        const natureLetter = actionRegExp!.groups!.nature
        const nature = natureLetterToNature(natureLetter)

        const action: IAction = {name, startTime, endTime, nature, description: '', type: type || 'default'}
        actions.push(action)
    }
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
                return 'neutral'
            default:
                return 'neutral'
        }
    }
}

function getActionDuration(action: IAction, unit: 'm' | 's' | 'ms' = 'ms') {
    let ms = action.startTime ? action.endTime.valueOf() - action.startTime.valueOf() : 0

    if (unit === 'ms') return ms
    if (unit === 's') return ms / 1000
    return Math.floor(ms / 1000 / 60)
}

function calculateActionsPercentage(actions: IAction[]): IActionsPercentage {
    const startDayTime = actions[0].startTime
    const endDayTime = actions.slice(-1)[0].endTime

    const wholeDayTime = endDayTime.valueOf() - startDayTime!.valueOf()

    let positiveActionsTime = actions.reduce((acc, action) => action.nature === 'positive' ? acc + getActionDuration(action) : acc, 0)
    let negativeActionsTime = actions.reduce((acc, action) => action.nature === 'positive' ? acc + getActionDuration(action) : acc, 0)
    let neutralActionsTime = actions.reduce((acc, action) => action.nature === 'positive' ? acc + getActionDuration(action) : acc, 0)

    return {
        positiveActionsTime: +(positiveActionsTime / wholeDayTime * 100).toFixed(2),
        negativeActionsTime: +(negativeActionsTime / wholeDayTime * 100).toFixed(2),
        neutralActionsTime: +(neutralActionsTime / wholeDayTime * 100).toFixed(2)
    }
}

function calculateProductivity(actions: IAction[]): number {
    let productivityValue = 0

    /* Consider Sport
        1 hour per day = +15
        +3 for every additional 15 minutes
    */
    const sportDurationM = actions.reduce((acc, action) => action.type === 'sport' ? acc + getActionDuration(action, 'm') : acc, 0)
    if (sportDurationM >= 60) productivityValue += 15 + Math.round((sportDurationM - 60) / 15) * 3

    /* Consider Positive actions
        6 minutes of any positive action = +1
        For every hour +5 in addition
    */
    const positiveActionsDurationM = actions.reduce((acc, action) => action.nature === 'positive' ? acc + getActionDuration(action, 'm') : acc, 0)
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

    return productivityValue
}

export interface IAnalyzeResult {
    actionsPercentage: IActionsPercentage
    productivity: number
}

export function analyzeTime(actionsString: string): IAnalyzeResult {

    const actions = parseActions(actionsString)
    const actionsPercentage = calculateActionsPercentage(actions)
    const productivity = calculateProductivity(actions)

    return {
        actionsPercentage,
        productivity
    }
}
interface IAction {
    name: string
    startTime?: Date
    endTime: Date
    nature: TNature
    type: TAction
    description: string
}

type TNature = 'positive' | 'neutral' | 'negative'
type TAction = 'sport' | 'default'
const actionTypes = ['sport', 'default']

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

        const actionRegExp = Array.from(stringAction.matchAll(/((?<startTimeHours>[012]?\d):(?<startTimeMinutes>[0-5]\d))?-(?<endTimeHours>[012]?\d):(?<endTimeMinutes>[0-5]\d)\)\s*(?<name>[^#.]+)\s#?(?<nature>[PNnПНн])?(\.(?<type>\w+))?/g))[0]

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

function calculateEfficiency(actions: IAction[]): number | any {
    const startDayTime = actions[0].startTime
    const endDayTime = actions.slice(-1)[0].endTime

    const wholeDayTime = endDayTime.valueOf() - startDayTime!.valueOf()

    let positiveActionsTime = actions.reduce((acc, action) => action.nature === 'positive' ? acc + getActionDurationMs(action) : acc, 0)
    if (positiveActionsTime === 0) return 0

    return (positiveActionsTime / wholeDayTime * 100).toFixed(2)
}

function getActionDurationMs(action: IAction) {
    return action.startTime ? action.endTime.valueOf() - action.startTime.valueOf() : 0
}

export interface IAnalyzeResult {
    positiveActionsPercent: number
    neutralActionsPercent: number
    negativeActionsPercent: number
    efficiency: number
}

export interface IAnalyzeResultError {
    errorMessage: string
}

export function analyzeTime(actionsString: string): IAnalyzeResult | IAnalyzeResultError | any {
    try {
        const actions = parseActions(actionsString)
        const efficiency = calculateEfficiency(actions)
    } catch (e: any) {
        return {errorMessage: e.message}
    }
}
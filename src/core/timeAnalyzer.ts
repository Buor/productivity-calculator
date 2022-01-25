interface IAction {
    name: string
    startTime?: Date
    endTime: Date
    nature: 'positive' | 'neutral' | 'negative'
}

function validateActionString(initialString: string, actionRegExp: RegExpMatchArray | null) {

    if (!actionRegExp || !actionRegExp.groups) throw new Error(`Error! Action "${initialString}" has bad formatting!`)
    if (!actionRegExp.groups.name) throw new Error(`Error! Action "${initialString}" has no name!`)
    if (!actionRegExp.groups.endTimeHours || !actionRegExp.groups.endTimeMinutes) throw new Error(`Error! Action "${initialString}" has no end time!`)

}

function parseActions(actionsString: string): IAction[] {
    const stringActions = actionsString.split('\n')
    const actions: IAction[] = []
    for (let stringAction of stringActions) {
        if (stringAction === '') continue

        const actionRegExp = Array.from(stringAction.matchAll(/((?<startTimeHours>[012]?\d):(?<startTimeMinutes>[0-5]\d))?-(?<endTimeHours>[012]?\d):(?<endTimeMinutes>[0-5]\d)\)\s*(?<name>[^#]+)#?(?<nature>[PNnПНн])?/g))[0]

        validateActionString(stringAction, actionRegExp)

        //form actionObject
        const name = actionRegExp!.groups!.name
        const startTime = new Date(0, 0, 0, +actionRegExp!.groups!.startTimeHours, +actionRegExp!.groups!.startTimeMinutes)
        const endTime = new Date(0, 0, 0, +actionRegExp!.groups!.endTimeHours, +actionRegExp!.groups!.endTimeMinutes)

        //check time validity
        const timeValidity = checkTimeValidity(stringAction, startTime, endTime)
        if (timeValidity !== 'ok') throw new Error(timeValidity)

        //define nature of action
        const natureLetter = actionRegExp!.groups!.nature
        let nature: 'positive' | 'neutral' | 'negative'
        switch (natureLetter) {
            case 'P':
            case 'П':
                nature = 'positive'
                break
            case 'N':
            case 'Н':
                nature = 'negative'
                break
            case 'n':
            case 'н':
                nature = 'neutral'
                break
            default:
                nature = 'neutral'
        }

        const action: IAction = {name, startTime, endTime, nature}
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
}

export function analyzeTime(actionsString: string): IAnalyzeResult | IAnalyzeResultError | void {
    const actions = parseActions(actionsString)
    //for test purposes
    console.log(actions)
}

export interface IAnalyzeResult {
    positiveActionsPercent: number
    neutralActionsPercent: number
    negativeActionsPercent: number
}

export interface IAnalyzeResultError {
    error: boolean
    errorMessage: string
}
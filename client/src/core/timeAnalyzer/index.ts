import {calculateDurationMs} from '../utils/timeUtils';
import {dealWithActions, dealWithFood, dealWithSleep, dealWithSport} from "./dealings";
import {getProductivity} from "./getProductivity";

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

export interface IProductivity {
    value: number
    comment: string,
    color: string
}

type TNature = 'positive' | 'neutral' | 'negative'
type TAction = 'sport' | 'default' | 'food' | 'sleep'
const actionTypes = ['sport', 'default', 'food', 'sleep']

function parseActions(actionsString: string): IAction[] {
    const stringActions = actionsString.split('\n')
    if(stringActions.length < 2) throw new Error(`Error! Strings amount is too low!`)

    const actions: IAction[] = []

    //Define date first
    const date = stringActions.shift()
    const dateData = date!.match(/(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.([2-9]\d{3})/)

    validateDate(dateData as Array<string | undefined>)

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

    if (actions.length === 0 || actions.length === 1) throw new Error('Error! No actions found!')

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

    function validateDate(dateData: Array<string | undefined> | null) {
        if(!dateData) throw new Error(`Error! Date was not provided or it's incorrect!`)
        if(!dateData[0] || !dateData[1] || !dateData[2]) throw new Error(`Error! Invalid data provided!`)
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

function getProductivityAndAdvices(actions: IAction[], actionsPercentages: IActionPercentage[]): [IProductivity, IAdvice[]] {
    let productivityValue = 0
    const advices: IAdvice[] = [];

    //Form advices and increase productivityValue
    [dealWithSport(actions), dealWithActions(actions, actionsPercentages), dealWithSleep(actions), dealWithFood(actions)]
        .forEach(entry => {
            productivityValue += entry[0]
            advices.push(entry[1])
        })

    const productivity = getProductivity(productivityValue)

    return [productivity, advices]
}

export interface IAnalyzeResult {
    actionsPercentages: IActionPercentage[]
    productivity: IProductivity,
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
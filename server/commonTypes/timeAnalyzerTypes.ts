export type TNature = 'positive' | 'neutral' | 'negative'
export type TAction = 'sport' | 'default' | 'food' | 'sleep'

export interface IAction {
    name: string
    startTime: Date
    endTime: Date
    nature: TNature
    type: TAction
    durationMs: number
    description: string
}

export interface IActionPercentages {
    positive: IActionPercentage
    neutral: IActionPercentage
    negative: IActionPercentage
}

export interface IActionPercentage {
    percentage: number,
    color?: string
    actionsTime: number
}

export interface IAdvice {
    text: string
    mark: TNature
}

export interface IProductivity {
    value: number
    comment: string,
    color: string
}

interface IDateData {
    actionsPercentages: IActionPercentages
    productivity: IProductivity,
    actions: IAction[],
    date: Date
}

export interface IAnalyzeResult extends IDateData {
    advicesLinks: string[]
}

export interface IDateResult extends IDateData {
    advices: IAdvice[]
}
import {IAction} from "../../../../commonTypes/timeAnalyzerTypes";

export function calculateDurationMs(startTime: Date, endTime: Date) {
    return endTime.valueOf() - startTime.valueOf()
}

export function convertMs(ms: number, to: 'm' | 's' | 'mh') {
    switch (to) {
        case 's':
            return ms / 1000
        case 'm':
            return Math.floor(ms / 1000 / 60)
        case 'mh':
            let allMinutes = Math.floor(ms / 1000 / 60)
            let hours = Math.floor(allMinutes / 60)
            return (hours > 0 ? hours + 'h' : "") + allMinutes % 60 + 'm'
        default:
            return ms
    }
}

export function restoreActionsDates(actions: IAction[]) {
    return actions.map(action => ({
        ...action,
        startTime: new Date(action.startTime),
        endTime: new Date(action.endTime)
    }))
}

const getStrMonth = (date: Date) => ('0' + (date.getMonth() + 1)).slice(-2)

const getStrDate = (date: Date) => ('0' + date.getDate()).slice(-2)

export function formatDate(date: Date, type: 'dot' | 'dash' = 'dot') {
    if (type === 'dot') return `${getStrDate(date)}.${getStrMonth(date)}.${date.getFullYear()}`
    return `${date.getFullYear()}-${getStrMonth(date)}-${getStrDate(date)}`
}

export function getActionTimeInterval(action: IAction) {
    return action.startTime.getHours() + ':' + ('0' + action.startTime.getMinutes()).slice(-2) + '-' + action.endTime.getHours() + ':' + ('0' + action.endTime.getMinutes()).slice(-2)
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


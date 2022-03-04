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

export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
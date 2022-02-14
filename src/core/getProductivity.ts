import {IProductivity} from "./timeAnalyzer";

export function getProductivity(productivityValue: number): IProductivity {
    if (productivityValue <= 20) return {color: 'red.500', comment: 'Bad productivity!', value: productivityValue}
    else if (productivityValue <= 49) return {
        color: 'red.500',
        comment: 'Low productivity!',
        value: productivityValue
    }
    else if (productivityValue <= 79) return {
        color: 'yellow.500',
        comment: 'Average productivity!',
        value: productivityValue
    }
    else if (productivityValue <= 99) return {
        color: 'green.500',
        comment: 'Good productivity!',
        value: productivityValue
    }
    else if (productivityValue >= 100) return {
        color: 'green.500',
        comment: 'Perfect productivity!',
        value: productivityValue
    }

    throw new Error(`Error! Can't form productivity object!`)
}
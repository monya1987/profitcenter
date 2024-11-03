import type { HashObj } from './types.ts'
export const getAverageValue = (obj: HashObj) => {
    let totalItems = 0
    const total = Object.keys(obj).reduce((acc, item) => {
        totalItems += obj[item]
        return (acc += Number(item) * obj[item])
    }, 0)
    return total / totalItems
}
export const getMedianValue = (obj: HashObj) => {
    const values = Object.keys(obj)
        .map((item) => Number(item))
        .sort((a, b) => a - b)
    const half = Math.floor(values.length / 2)
    return values.length % 2
        ? values[half]
        : (values[half - 1] + values[half]) / 2
}
export const getModeValue = (obj: HashObj) => {
    const max = Object.entries(obj).reduce(
        (acc, values) => {
            if (values[1] > acc[1]) {
                return values
            } else {
                return acc
            }
        },
        ['0', 0]
    )
    return Number(max[0])
}

export const getDeviationValue = (obj: HashObj, averageVal: number) => {
    const rawVal = Object.keys(obj)
        .map((item) => Number(item) - averageVal)
        .map((item) => Math.pow(item, 2))
        .reduce((acc, item) => (acc += item), 0)
    return Math.sqrt(rawVal / Object.keys(obj).length)
}

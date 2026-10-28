export function getNoOfLoopYear(){
    const startYear = 2026
    const endYear = 2020

    const total = Math.abs(startYear - endYear) + 1

    return total
}
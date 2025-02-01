export interface Today {
    hour: string
    num: number
}
export interface Week {
    day: string
    num: number
}
export interface Month {
    date: string
    num: number
}
export interface Path {
    count: number
    path: string
}
export interface renderChartData {
    day: Today[]
    week: Week[]
    month: Month[]
}

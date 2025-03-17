import httpApi from '~/api/request'

export function getReqTop() {
    return httpApi({
        url: '/news/reqtop',
        method: "GET"
    })
}

export function getTypetop() {
    return httpApi({
        url: '/news/typetop',
        method: "GET"
    })
}

export function getTimeHours() {
    return httpApi({
        url: '/analyze/hours',
        method: "GET"
    })
}

export function getTimeday() {
    return httpApi({
        url: '/analyze/day',
        method: "GET"
    })
}
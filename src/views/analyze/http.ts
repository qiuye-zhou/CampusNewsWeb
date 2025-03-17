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
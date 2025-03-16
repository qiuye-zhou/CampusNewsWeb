import httpApi from '~/api/request'

export function getReqTop() {
    return httpApi({
        url: '/news/reqtop',
        method: "GET"
    })
}
import httpApi from '~/api/request'

export function getTimeLine() {
    return httpApi({
        url: '/news/timeline',
        method: "GET"
    })
}

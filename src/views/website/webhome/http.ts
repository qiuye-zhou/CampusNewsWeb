import httpApi from '~/api/request'

export function getradom() {
    return httpApi({
        url: '/news/random',
        method: "GET"
    })
}

export function getrecently() {
    return httpApi({
        url: '/news/recently',
        method: "GET"
    })
}
import httpApi from '~/api/request'

export function getSearch(search: string) {
    return httpApi({
        url: `/news/search?title=${search}`,
        method: "GET"
    })
}
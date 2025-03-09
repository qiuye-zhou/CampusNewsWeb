import httpApi from '~/api/request'

export function getAllType() {
    return httpApi({
        url: '/category/all',
        method: "GET"
    })
}

export function getTagList(id: string) {
    return httpApi({
        url: `/category/${id}`,
        method: "GET"
    })
}
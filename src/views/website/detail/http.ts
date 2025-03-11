import httpApi from '~/api/request'

export function getNewDetail(id: string) {
    return httpApi({
        url: `/news/${id}`,
        method: "GET"
    })
}

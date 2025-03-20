import httpApi from '~/api/request'

//category api>>>
export function getAllCategory() {
    return httpApi({
        url: '/category/all',
        method: "GET"
    })
}

export function addCategory(data: any) {
    return httpApi({
        url: '/category/add',
        method: "POST",
        data
    })
}

export function deleteCategory(id: string) {
    return httpApi({
        url: `/category/${id}`,
        method: "DELETE"
    })
}
//category api<<<

//list api>>>
export function getAllPass() {
    return httpApi({
        url: '/news/allpass',
        method: "GET"
    })
}

export function deleteNew(id: string) {
    return httpApi({
        url: `/news/${id}`,
        method: "DELETE"
    })
}
import httpApi from '~/api/request'

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
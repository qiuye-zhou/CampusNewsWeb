import httpApi from '~/api/request'

export function getAllAdmin() {
    return httpApi({
        url: '/user/alladmin',
        method: "GET"
    })
}

export function getAllEdit() {
    return httpApi({
        url: '/user/alledit',
        method: "GET"
    })
}

export function getRegister(data: any) {
    return httpApi({
        url: '/user/register',
        method: "POST",
        data
    })
}

export function deleteAccount(id: string) {
    return httpApi({
        url: `/user/${id}`,
        method: "DELETE"
    })
}
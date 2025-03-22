import httpApi from '~/api/request'

export function getAllAdminPendingPass() {
    return httpApi({
        url: '/news/alladminpendingpass',
        method: "GET"
    })
}

export function examineNew(data: any) {
    return httpApi({
        url: '/news/examinenew',
        method: "POST",
        data
    })
}
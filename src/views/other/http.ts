import httpApi from '~/api/request'

export function updateInfo(data: any) {
    return httpApi({
        url: '/user/updata',
        method: "PATCH",
        data
    })
}
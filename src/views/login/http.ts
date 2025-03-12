import httpApi from '~/api/request'

export function login(data: any) {
    return httpApi({
        url: '/user/login',
        method: "POST",
        data
    })
}